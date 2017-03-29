// @flow

import type { ActionType } from 'fl-types'
import type { CourseQuestionType, StateType } from 'fl-course'

export const types = {
  REQUEST_COURSE_LOAD: 'COURSE/REQUEST_COURSE_LOAD',
  LOAD_COURSE: 'COURSE/LOAD_COURSE',
  UPDATE_WORD_STATUS: 'COURSE/UPDATE_WORD_STATUS'
}

export const actions = {
  requestCourseLoad: () => ({ type: types.REQUEST_COURSE_LOAD }),
  loadCourse: (words: Array<CourseQuestionType>) => ({ type: types.LOAD_COURSE, payload: words }),
  updateWordStatus: (word: string, status: boolean) => ({ type: types.UPDATE_WORD_STATUS, payload: {
    word, status
  } }) // FIXME: status must not be a string
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
      return {
        ...state,
        isLoading: false,
        questions: payload
      }
    case types.UDPATE_WORD_STATUS:
      const updatedWord = payload ? payload.word : null
      if (!updatedWord) {
        return state
      }
      const wordIndex = state.questions.findIndex(question => ( question.word === updatedWord ))
      state.questions[wordIndex].answered = true
      return {
        ...state,
        questions: state.questions.slice()
      }
    default:
      return state
  }
}

export const getAllQuestions = (state: Object): Array<CourseQuestionType> => state.course.questions
export const isLoading = (state: Object): boolean => state.course.isLoading
