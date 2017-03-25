// @flow

import type { ActionType } from './index'

export const types = {
  SUBMIT_WORD: 'FLASHCARD/SUBMIT_WORD',
  ANSWER_CORRECTLY: 'FLASHCARD/ANSWER_CORRECTLY',
  ANSWER_INCORRECTLY: 'FLASHCARD/ANSWER_INCORRECTLY'
}

export const actions = {
  submit: (answer: string) => ({ type: types.SUBMIT_WORD, payload: answer }),
  answerCorrectly: () => ({ type: types.ANSWER_CORRECTLY }),
  answerIncorrectly: () => ({ type: types.ANSWER_INCORRECTLY })
}

type StateType = {
  word: string,
  meaning: string
}

export const initialState = {
  word: 'Manzana',
  meaning: 'Apple'
}

export default (state: StateType = initialState, { type, payload }: ActionType) => {
  switch (type) {
    case types.ANSWER_CORRECTLY:
      return { ...state, word: 'Word', meaning: 'Palabra', previousStatus: true } // TODO: get next word from some queue
    default:
      return state
  }
}

type CardType = { word: string, meaning: string }
export const getCurrentCard = (state: Object): CardType => ({ word: state.flashcard.word, meaning: state.flashcard.meaning })