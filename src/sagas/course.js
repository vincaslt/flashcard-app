// @flow

import { types, actions, getAllQuestions } from '../reducers/course'
import { actions as flashcardActions } from '../reducers/flashcard'
import { takeLatest, put, call, select } from 'redux-saga/effects'
import { getWords } from '../api/words'

function* requestCourseLoadSaga() {
  const questions = yield select(getAllQuestions)
  // FIXME: temporary until real API
  if (questions.length === 0) {
    const words = yield call(getWords)
    yield put(actions.loadCourse(words))
  }
  yield put(flashcardActions.requestUpdateCard())
}

export default [
  takeLatest(types.REQUEST_COURSE_LOAD, requestCourseLoadSaga)
]
