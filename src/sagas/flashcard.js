// @flow

import { types as flashcardTypes, actions as flashcardActions } from '../reducers/flashcard'
import { actions as courseActions, getAllQuestions, getCurrentQuestion } from '../reducers/course'
import { getRepetitionConfig } from '../reducers/settings'
import { WordStatus } from '../constants'
import type { CourseQuestionType } from 'fl-course'
import type { CardType } from 'fl-flashcard'
import { takeLatest, takeEvery, put, select } from 'redux-saga/effects'
import SpacedRepetition from 'spaced-repetition'

function* submitAnswerSaga(action) {
  const submittedAnswer: string = action.payload
  const { word, meaning, status } = yield select(getCurrentQuestion)
  const repetitionConfig = yield select(getRepetitionConfig)
  const repetition = new SpacedRepetition(new Date(), status, repetitionConfig)

  if (submittedAnswer.toLowerCase() === meaning.toLowerCase()) {
    yield put(flashcardActions.answerCorrectly(submittedAnswer))
    const nextRepetition = repetition.good()
    yield put(courseActions.updateWordStatus(word, nextRepetition.state, nextRepetition.date))
    yield put(flashcardActions.requestUpdateCard())
  } else {
    yield put(flashcardActions.answerIncorrectly(submittedAnswer))
    const nextRepetition = repetition.bad()
    yield put(courseActions.updateWordStatus(word, nextRepetition.state, nextRepetition.date))
  }
}

function* requestUpdateCard(action) {
  const selectNextCard = (cards): ?CardType => {
    const remaining = cards
      .filter((card: CourseQuestionType) => card.status !== WordStatus.NEVER)
      .asMutable()
      .sort((a: CourseQuestionType, b: CourseQuestionType) => {
        if (b.nextDate === null) {
          return a.nextDate
            ? (a.nextDate.getTime() - (new Date()).getTime())
            : 0
        } else if (a.nextDate === null) {
          return b.nextDate
            ? ((new Date()).getTime() - b.nextDate.getTime())
            : 0
        }
        return a.nextDate.getTime() - b.nextDate.getTime()
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
  takeEvery(flashcardTypes.REQUEST_UDPATE_CARD, requestUpdateCard)
]
