// @flow

import Immutable from 'seamless-immutable'
import { createSelector } from 'reselect'
import type { ActionType, StateType } from 'fl-types'
import type { LastAnswerType, CardType, StateType as FlashcardState } from 'fl-flashcard'
import type { Immutable as ImmutableType } from 'fl-seamless-immutable'
import type { Selector } from 'reselect'

export const types = {
  SUBMIT_WORD: 'FLASHCARD/SUBMIT_WORD',
  ANSWER_CORRECTLY: 'FLASHCARD/ANSWER_CORRECTLY',
  ANSWER_INCORRECTLY: 'FLASHCARD/ANSWER_INCORRECTLY',
  REQUEST_UPDATE_CARD: 'FLASHCARD/REQUEST_UPDATE_CARD',
  UPDATE_CARD: 'FLASHCARD/UPDATE_CARD'
}

export const actions = {
  submit: (answer: string) => ({ type: types.SUBMIT_WORD, payload: answer }),
  answerCorrectly: (answer: string) => ({ type: types.ANSWER_CORRECTLY, payload: answer }),
  answerIncorrectly: (answer: string) => ({ type: types.ANSWER_INCORRECTLY, payload: answer }),
  requestUpdateCard: () => ({ type: types.REQUEST_UPDATE_CARD }),
  updateCard: (newCard: CardType) => ({ type: types.UPDATE_CARD, payload: newCard })
}

export const initialState: ImmutableType<FlashcardState> = Immutable({
  word: '',
  meaning: '',
  lastAnswer: null,
  startTime: null,
  endTime: null
})

export default (state: ImmutableType<FlashcardState> = initialState, { type, payload }: ActionType) => {
  switch (type) {
    case types.SUBMIT_WORD:
      return state.set('endTime', Date.now())
    case types.ANSWER_CORRECTLY:
      return state
        .setIn(['lastAnswer', 'answer'], payload)
        .setIn(['lastAnswer', 'correct'], true)
    case types.ANSWER_INCORRECTLY:
      return state
        .setIn(['lastAnswer', 'answer'], payload)
        .setIn(['lastAnswer', 'correct'], false)
    case types.UPDATE_CARD:
      return state
        .set('word', payload ? payload.word : '')
        .set('meaning', payload ? payload.meaning : '')
        .set('startTime', Date.now())
        .set('endTime', null)
    default:
      return state
  }
}

export const getCurrentWord = (state: StateType): string => state.flashcard.word
export const getCurrentMeaning = (state: StateType): string => state.flashcard.meaning
export const getCurrentStartTime = (state: StateType): number => state.flashcard.startTime
export const getCurrentEndTime = (state: StateType): number => state.flashcard.endTime
export const getLastAnswer = (state: StateType): ?LastAnswerType => state.flashcard.lastAnswer

export const getCurrentCard: Selector<CardType> = createSelector(
  getCurrentWord,
  getCurrentMeaning,
  (word, meaning) => ({
    word, meaning
  })
)

export const getAnswerTime: Selector<?number> = createSelector(
  getCurrentStartTime,
  getCurrentEndTime,
  (startTime, endTime) => (startTime && endTime) ? endTime - startTime : null
)
