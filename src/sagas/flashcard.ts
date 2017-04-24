import {
  types as flashcardTypes,
  actions as flashcardActions,
  answerTime,
  currentQuestion
} from '../reducers/flashcard'
import { actions as courseActions, nextQuestion, isComplete } from '../reducers/course'
import { RepetitionConfig, repetitionConfig } from '../reducers/settings'
import {  AnswerStatus } from '../constants'
import { Action } from 'redux-actions'
import { takeLatest, takeEvery, put, select } from 'redux-saga/effects'
import { checkAnswer } from '../utils/course'

const SpacedRepetition = require('spaced-repetition') // FIXME: write type defs

function* submitAnswerSaga(action: Action<string>) {
  const submittedAnswer: string = action.payload || ''
  const { word, meaning, status }: Course.Question = yield select(currentQuestion)
  const timeTaken: number = yield select(answerTime)
  const config: RepetitionConfig = yield select(repetitionConfig)
  const repetition = new SpacedRepetition(new Date(), status, config)
  const answerStatus = checkAnswer(submittedAnswer, meaning, timeTaken)
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

function* requestUpdateCard(action: Action<{}>) {
  const nextCard: Course.Question|null = yield select(nextQuestion)
  const complete = yield select(isComplete)
  if (complete) {
    yield put(courseActions.completeCourse())
  } else if (nextCard) {
    yield put(flashcardActions.updateCard(nextCard))
  } else {
    throw new Error(`Requesting to update card, but the next card does not exist`)
  }
}

export default [
  takeLatest(flashcardTypes.SUBMIT_ANSWER, submitAnswerSaga),
  takeEvery(flashcardTypes.REQUEST_UPDATE_CARD, requestUpdateCard)
]
