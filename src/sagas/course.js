// @flow

import { types, actions } from '../reducers/course'
import { actions as flashcardActions } from '../reducers/flashcard'
import { takeLatest, put, call } from 'redux-saga/effects'
import { getWords } from '../api/words'

function* requestCourseLoadSaga() {
  const words = yield call(getWords)
  yield put(actions.loadCourse(words))
  yield put(flashcardActions.requestUpdateCard())
}

export default [
  takeLatest(types.REQUEST_COURSE_LOAD, requestCourseLoadSaga)
]
