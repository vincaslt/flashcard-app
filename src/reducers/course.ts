import { createAction, handleActions, Action } from 'redux-actions'
import { createSelector, Selector } from 'reselect'
import iassign from '../utils/immutable'
import { State } from './index'

export interface CourseQuestion {
  word: string
  meaning: string
  status: Course.WordStatus
  nextDate: number|null
}

export interface CourseState {
  questions: CourseQuestion[]
  isLoading: boolean
  complete: boolean
}

export interface WordStatusUpdate {
  word: string
  status: Course.WordStatus
  nextDate: Date|null
}

export const types = {
  REQUEST_COURSE_LOAD: 'COURSE/REQUEST_COURSE_LOAD',
  LOAD_COURSE: 'COURSE/LOAD_COURSE',
  UPDATE_WORD_STATUS: 'COURSE/UPDATE_WORD_STATUS',
  COMPLETE_COURSE: 'COURSE/COMPLETE_COURSE'
}

export const actions = {
  requestCourseLoad: createAction(types.REQUEST_COURSE_LOAD),
  loadCourse: createAction(types.LOAD_COURSE, (words: Course.Question[]) => words),
  updateWordStatus: createAction<WordStatusUpdate, string, string, Date>(
    types.UPDATE_WORD_STATUS,
    (word: string, status: Course.WordStatus, nextDate: Date) => ({
      word, status, nextDate: nextDate
    })
  ), // FIXME: rework to update by id
  completeCourse: createAction(types.COMPLETE_COURSE)
}

export const initialState = iassign.from({
  questions: [],
  isLoading: false,
  complete: false
})

export default handleActions<CourseState, WordStatusUpdate|Course.Question[]>({
  [types.REQUEST_COURSE_LOAD]: (state: CourseState) => (
    iassign(state, (newState) => ({
      ...newState, isLoading: true
    }))
  ),
  [types.LOAD_COURSE]: (state: CourseState, action: Action<Course.Question[]>) => (
    iassign(state, (newState: CourseState) => ({
      ...newState,
      isLoading: false,
      complete: false,
      questions: action.payload ? action.payload.map<CourseQuestion>(question => ({
        ...question,
        nextDate: question.nextDate ? question.nextDate.getTime() : null
      })) : []
    }))
  ),
  [types.UPDATE_WORD_STATUS]: (state: CourseState, action: Action<WordStatusUpdate>) => {
    const payload: WordStatusUpdate|null = action.payload || null
    if (payload) {
      const st = iassign(state,
        (newState, { getWordIndex }) => { return newState.questions[getWordIndex(newState)] },
        (question) => {
          if (question) {
            question.status = payload.status
            question.nextDate = payload.nextDate ? payload.nextDate.getTime() : null
          }
          return question
        },
        {
          getWordIndex: (newState: CourseState) => (
            newState.questions.findIndex(question => (question.word === payload.word ))
          )
        }
      )
      return st
    }
    return state
  },
  [types.COMPLETE_COURSE]: (state: CourseState) => (
    iassign(state, (newState) => ({
      ...newState, complete: true
    }))
  )
}, initialState)

const allQuestionsSelector: Selector<State, CourseQuestion[]> = (state) => state.course.questions

export const isLoading: Selector<State, boolean> = (state) => state.course.isLoading
export const allQuestions = createSelector<State, CourseQuestion[], Course.Question[]>(
  allQuestionsSelector,
  (questions) => questions.map(question => ({
    ...question,
    nextDate: question.nextDate ? new Date(question.nextDate) : null
  }))
)
export const nextQuestion = createSelector(
  allQuestions,
  (questions) => {
    const remaining: Course.Question[] = questions
      // Ignore words that are already learnt or their date is not yet due
      .filter((card: Course.Question) => card.status !== 'never')
      // Sort: time<now | null | time>now
      .sort((a: Course.Question, b: Course.Question) => {
        return ((a.nextDate || new Date()).getTime() - Date.now())
             - ((b.nextDate || new Date()).getTime() - Date.now())
      })
    return remaining.length ? remaining[0] : null
  }
)
export const nextQuestionDate = createSelector(
  nextQuestion,
  (question) => !question ? undefined : (question || {}).nextDate || new Date()
)
export const isComplete = createSelector(
  nextQuestionDate,
  (nextDate) => !nextDate || nextDate.getTime() > Date.now() 
)
