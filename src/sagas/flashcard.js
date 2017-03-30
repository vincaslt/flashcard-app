// @flow

import { types as flashcardTypes, actions as flashcardActions } from '../reducers/flashcard'
import { actions as courseActions, getAllQuestions, getCurrentQuestion } from '../reducers/course'
import { WordStatus } from '../constants'
import type { CourseQuestionType } from 'fl-course'
import type { CardType } from 'fl-flashcard'
import { takeLatest, takeEvery, put, select } from 'redux-saga/effects'
import SpacedRepetition from 'spaced-repetition'
import sample from 'lodash.sample'

function* submitAnswerSaga(action) {
  const submittedAnswer: string = action.payload
  const { word, meaning, status } = yield select(getCurrentQuestion)
  const repetition = new SpacedRepetition(new Date(), status)
  if (submittedAnswer.toLowerCase() === meaning.toLowerCase()) {
    yield put(flashcardActions.answerCorrectly(submittedAnswer))
    yield put(courseActions.updateWordStatus(word, repetition.good().state))
    yield put(flashcardActions.requestUpdateCard())
  } else {
    yield put(flashcardActions.answerIncorrectly(submittedAnswer))
    yield put(courseActions.updateWordStatus(word, repetition.bad().state))
  }
}

function* requestUpdateCard(action) {
  const selectNextCard = (cards): CardType => {
    const remaining = cards.filter((card: CourseQuestionType) => card.status !== WordStatus.NEVER)
    return sample(remaining)
  }

  const cards = yield select(getAllQuestions)
  const nextCard = selectNextCard(cards)
  yield put(flashcardActions.updateCard(nextCard))
}

export default [
  takeLatest(flashcardTypes.SUBMIT_WORD, submitAnswerSaga),
  takeEvery(flashcardTypes.REQUEST_UDPATE_CARD, requestUpdateCard)
]
