// @flow

import type { ActionType } from 'fl-types'
import type { LastAnswerType, CardType, StateType } from 'fl-flashcard'

export const types = {
  SUBMIT_WORD: 'FLASHCARD/SUBMIT_WORD',
  ANSWER_CORRECTLY: 'FLASHCARD/ANSWER_CORRECTLY',
  ANSWER_INCORRECTLY: 'FLASHCARD/ANSWER_INCORRECTLY'
}

export const actions = {
  submit: (answer: string) => ({ type: types.SUBMIT_WORD, payload: answer }),
  answerCorrectly: (answer: string) => ({ type: types.ANSWER_CORRECTLY, payload: answer }),
  answerIncorrectly: (answer: string) => ({ type: types.ANSWER_INCORRECTLY, payload: answer })
}

export const initialState = {
  word: 'Manzana',
  meaning: 'Apple',
  lastAnswer: null
}

// FIXME: rework to immutable
export default (state: StateType = initialState, { type, payload }: ActionType) => {
  switch (type) {
    case types.ANSWER_CORRECTLY:
      return {
        ...state,
        word: 'Word',
        meaning: 'Palabra',
        lastAnswer: {
          word: state.word,
          answer: payload,
          correct: true
        }
      } // TODO: get next word from some queue
    case types.ANSWER_INCORRECTLY:
      return {
        ...state,
        lastAnswer: {
          word: state.word,
          answer: payload,
          correct: false
        }
      }
    default:
      return state
  }
}

export const getCurrentCard = (state: Object): CardType => ({ word: state.flashcard.word, meaning: state.flashcard.meaning })
export const getLastAnswer = (state: Object): ?LastAnswerType => state.flashcard.lastAnswer
