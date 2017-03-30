// @flow

import type { ActionType } from 'fl-types'
import type { LastAnswerType, CardType, StateType } from 'fl-flashcard'

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

export const initialState = {
  word: '',
  meaning: '',
  lastAnswer: null
}

// FIXME: rework to immutable
export default (state: StateType = initialState, { type, payload }: ActionType) => {
  switch (type) {
    case types.ANSWER_CORRECTLY:
      return {
        ...state,
        lastAnswer: {
          word: state.word,
          answer: payload,
          correct: true
        }
      }
    case types.ANSWER_INCORRECTLY:
      return {
        ...state,
        lastAnswer: {
          word: state.word,
          answer: payload,
          correct: false
        }
      }
    case types.UDPATE_CARD:
      return {
        ...state,
        word: payload ? payload.word : '',
        meaning: payload ? payload.meaning : ''
      }
    default:
      return state
  }
}

export const getCurrentCard = (state: Object): CardType => ({ word: state.flashcard.word, meaning: state.flashcard.meaning })
export const getLastAnswer = (state: Object): ?LastAnswerType => state.flashcard.lastAnswer
