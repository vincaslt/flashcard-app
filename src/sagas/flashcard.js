// @flow

import { types, actions, getCurrentCard } from '../reducers/flashcard'
import { takeLatest, put, select } from 'redux-saga/effects'

function* submitAnswerSaga(action) {
  const submittedAnswer: string = action.payload
  const { meaning } = yield select(getCurrentCard)
  if (submittedAnswer.toLowerCase() === meaning.toLowerCase()) {
    yield put(actions.answerCorrectly(submittedAnswer))
  } else {
    yield put(actions.answerIncorrectly(submittedAnswer))
  }
}

export default [
  takeLatest(types.SUBMIT_WORD, submitAnswerSaga)
]
