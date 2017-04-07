// @flow

import { getCurrentCard } from './flashcard'
import { WordStatus } from '../constants'
import type { ActionType } from 'fl-types'
import type { CourseQuestionType, StateType } from 'fl-course'
import type { CardType } from 'fl-flashcard'
import { createSelector } from 'reselect'

export const types = {
  REQUEST_COURSE_LOAD: 'COURSE/REQUEST_COURSE_LOAD',
  LOAD_COURSE: 'COURSE/LOAD_COURSE',
  UPDATE_WORD_STATUS: 'COURSE/UPDATE_WORD_STATUS'
}

export const actions = {
  requestCourseLoad: () => ({ type: types.REQUEST_COURSE_LOAD }),
  loadCourse: (words: Array<CourseQuestionType>) => ({ type: types.LOAD_COURSE, payload: words }),
  updateWordStatus: (word: string, status: string, nextDate: Date) => ({ type: types.UPDATE_WORD_STATUS, payload: {
    word, status, nextDate: nextDate.getTime()
  } })
}

export const initialState = {
  questions: [],
  isLoading: false
}

// FIXME: rework to immutable
export default (state: StateType = initialState, { type, payload }: ActionType) => {
  switch (type) {
    case types.REQUEST_COURSE_LOAD:
      return {
        ...state,
        isLoading: true
      }
    case types.LOAD_COURSE:
      const words = payload || []
      return {
        ...state,
        isLoading: false,
        questions: words.map(word => ({
          ...word,
          status: WordStatus.NEW,
          nextDate: null
        }))
      }
    case types.UPDATE_WORD_STATUS:
      if (payload) {
        const wordIndex = state.questions.findIndex(question => ( question.word === payload.word ))
        state.questions[wordIndex].status = payload.status
        state.questions[wordIndex].nextDate = payload.nextDate
        return {
          ...state,
          questions: state.questions.slice()
        }
      }
      return state
    default:
      return state
  }
}

const _selectAllQuestions = (state: Object) => state.course.questions

export const isLoading = (state: Object): boolean => state.course.isLoading
export const getAllQuestions: Array<CourseQuestionType> = createSelector(
  _selectAllQuestions,
  (questions) => questions.map(question => ({
    ...question,
    nextDate: question.nextDate ? new Date(question.nextDate) : null
  }))
)
export const getCurrentQuestion: CourseQuestionType = createSelector(
  getAllQuestions,
  getCurrentCard,
  (questions: Array<CourseQuestionType>, card: CardType) => {
    const wordIndex = questions.findIndex(question => ( question.word === card.word ))
    return wordIndex !== -1 ? questions.slice(wordIndex, wordIndex + 1)[0] : null
  }
)
