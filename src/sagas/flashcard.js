// @flow

import SpacedRepetition from 'spaced-repetition'
import { types as flashcardTypes, actions as flashcardActions } from '../reducers/flashcard'
import { actions as courseActions, getAllQuestions, getCurrentQuestion } from '../reducers/course'
import { getRepetitionConfig } from '../reducers/settings'
import { WordStatus, AnswerStatus } from '../constants'
import type { CourseQuestionType } from 'fl-course'
import type { CardType } from 'fl-flashcard'
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
  // TODO: move to utils
  const selectNextCard = (cards): ?CardType => {
    const remaining: Array<CourseQuestionType> = cards
      // Ignore words that are already learnt or their date is not yet due
      .filter((card: CourseQuestionType) => (
        card.status !== WordStatus.NEVER) &&
        (new Date(card.nextDate) <= (new Date()).getTime())
      )
      .asMutable()
      // Sort: time<now | null
      .sort((a: CourseQuestionType, b: CourseQuestionType) => {
        return new Date(a.nextDate).getTime() - new Date(b.nextDate).getTime()
      })

    return remaining.length ? remaining[0] : null
  }

  const cards = yield select(getAllQuestions)
  const nextCard = selectNextCard(cards)
  if (nextCard) {
    yield put(flashcardActions.updateCard(nextCard))
  } else {
    yield put(courseActions.completeCourse())
  }
}

export default [
  takeLatest(flashcardTypes.SUBMIT_WORD, submitAnswerSaga),
  takeEvery(flashcardTypes.REQUEST_UPDATE_CARD, requestUpdateCard)
]
