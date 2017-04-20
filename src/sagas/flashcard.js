// @flow

import SpacedRepetition from 'spaced-repetition'
import { types as flashcardTypes, actions as flashcardActions } from '../reducers/flashcard'
import { actions as courseActions, getNextQuestion, getCurrentQuestion, getIsComplete } from '../reducers/course'
import { getRepetitionConfig } from '../reducers/settings'
import {  AnswerStatus } from '../constants'
import { takeLatest, takeEvery, put, select } from 'redux-saga/effects'
import { checkAnswer } from '../utils/course'

function* submitAnswerSaga(action) {
  const submittedAnswer: string = action.payload
  const { word, meaning, status } = yield select(getCurrentQuestion)
  const repetitionConfig = yield select(getRepetitionConfig)
  const repetition = new SpacedRepetition(new Date(), status, repetitionConfig)

  // TODO: rework how answers are set to account for good answer (answerCorrectly func)
  if (checkAnswer(submittedAnswer, meaning) === AnswerStatus.GOOD) {
    yield put(flashcardActions.answerCorrectly(submittedAnswer))
    const nextRepetition = repetition.good() // TODO: account for good/ok difference
    yield put(courseActions.updateWordStatus(word, nextRepetition.state, nextRepetition.date))
    yield put(flashcardActions.requestUpdateCard())
  } else {
    yield put(flashcardActions.answerIncorrectly(submittedAnswer))
    const nextRepetition = repetition.bad()
    yield put(courseActions.updateWordStatus(word, nextRepetition.state, nextRepetition.date))
  }
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
