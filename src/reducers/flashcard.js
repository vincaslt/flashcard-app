// @flow

import type { ActionType, StateType } from 'fl-types'
import type { LastAnswerType, CardType, StateType as FlashcardState } from 'fl-flashcard'
import Immutable from 'seamless-immutable'
import type { Immutable as ImmutableType } from 'fl-seamless-immutable'

export const types = {
  SUBMIT_WORD: 'FLASHCARD/SUBMIT_WORD',
  ANSWER_CORRECTLY: 'FLASHCARD/ANSWER_CORRECTLY',
  ANSWER_INCORRECTLY: 'FLASHCARD/ANSWER_INCORRECTLY',
  REQUEST_UDPATE_CARD: 'FLASHCARD/REQUEST_UPDATE_CARD',
  UDPATE_CARD: 'FLASHCARD/UPDATE_CARD'
}

export const actions = {
  submit: (answer: string) => ({ type: types.SUBMIT_WORD, payload: answer }),
  answerCorrectly: (answer: string) => ({ type: types.ANSWER_CORRECTLY, payload: answer }),
  answerIncorrectly: (answer: string) => ({ type: types.ANSWER_INCORRECTLY, payload: answer }),
  requestUpdateCard: () => ({ type: types.REQUEST_UDPATE_CARD }),
  updateCard: (newCard: CardType) => ({ type: types.UDPATE_CARD, payload: newCard })
}

export const initialState = Immutable({
  word: '',
  meaning: '',
  lastAnswer: null
})

export default (state: ImmutableType<FlashcardState> = initialState, { type, payload }: ActionType) => {
  switch (type) {
    case types.ANSWER_CORRECTLY:
      return state
        .setIn(['lastAnswer', 'answer'], payload)
        .setIn(['lastAnswer', 'correct'], true)
    case types.ANSWER_INCORRECTLY:
      return state
        .setIn(['lastAnswer', 'answer'], payload)
        .setIn(['lastAnswer', 'correct'], false)
    case types.UDPATE_CARD:
      return state
        .set('word', payload ? payload.word : '')
        .set('meaning', payload ? payload.meaning : '')
    default:
      return state
  }
}

export const getCurrentCard = (state: StateType): CardType => ({
  word: state.flashcard.word,
  meaning: state.flashcard.meaning
})
export const getLastAnswer = (state: StateType): ?LastAnswerType => state.flashcard.lastAnswer
