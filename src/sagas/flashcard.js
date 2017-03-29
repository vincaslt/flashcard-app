// @flow

import { types as flashcardTypes, actions as flashcardActions, getCurrentCard } from '../reducers/flashcard'
import { actions as courseActions, getAllQuestions } from '../reducers/course'
import type { CourseQuestionType } from 'fl-course'
import type { CardType } from 'fl-flashcard'
import { takeLatest, takeEvery, put, select } from 'redux-saga/effects'
import sample from 'lodash.sample'

function* submitAnswerSaga(action) {
  const submittedAnswer: string = action.payload
  const { meaning } = yield select(getCurrentCard)
  if (submittedAnswer.toLowerCase() === meaning.toLowerCase()) {
    yield put(flashcardActions.answerCorrectly(submittedAnswer))
    yield put(courseActions.updateWordStatus(submittedAnswer, true))
    yield put(flashcardActions.requestUpdateCard())
  } else {
    yield put(flashcardActions.answerIncorrectly(submittedAnswer))
    yield put(courseActions.updateWordStatus(submittedAnswer, false))
  }
}

function* requestUpdateCard(action) {
  const selectNextCard = (cards): CardType => {
    const remaining = cards.filter((card: CourseQuestionType) => !card.answered)
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
