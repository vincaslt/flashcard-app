// @flow

import SpacedRepetition from 'spaced-repetition'
import { types as flashcardTypes, actions as flashcardActions, getAnswerTime } from '../reducers/flashcard'
import { actions as courseActions, getNextQuestion, getCurrentQuestion, getIsComplete } from '../reducers/course'
import { getRepetitionConfig } from '../reducers/settings'
import {  AnswerStatus } from '../constants'
import { takeLatest, takeEvery, put, select } from 'redux-saga/effects'
import { checkAnswer } from '../utils/course'

function* submitAnswerSaga(action) {
  const submittedAnswer: string = action.payload
  const { word, meaning, status } = yield select(getCurrentQuestion)
  const answerTime = yield select(getAnswerTime)
  const repetitionConfig = yield select(getRepetitionConfig)
  const repetition = new SpacedRepetition(new Date(), status, repetitionConfig)
  const answerStatus = checkAnswer(submittedAnswer, meaning, answerTime)
  let nextRepetition = null

  if (answerStatus === AnswerStatus.GOOD) {
    yield put(flashcardActions.answerCorrectly(submittedAnswer))
    nextRepetition = repetition.good()
  } else if (answerStatus === AnswerStatus.OK) {
    yield put(flashcardActions.answerCorrectly(submittedAnswer))
    nextRepetition = repetition.ok()
  } else {
    yield put(flashcardActions.answerIncorrectly(submittedAnswer))
    nextRepetition = repetition.bad()
  }
  yield put(courseActions.updateWordStatus(word, nextRepetition.state, nextRepetition.date))
  yield put(flashcardActions.requestUpdateCard())
}

function* requestUpdateCard(action) {
  const nextCard = yield select(getNextQuestion)
  yield put(flashcardActions.updateCard(nextCard))

  const complete = yield select(getIsComplete)
  if (complete) {
    yield put(courseActions.completeCourse())
  }
}

export default [
  takeLatest(flashcardTypes.SUBMIT_WORD, submitAnswerSaga),
  takeEvery(flashcardTypes.REQUEST_UPDATE_CARD, requestUpdateCard)
]
