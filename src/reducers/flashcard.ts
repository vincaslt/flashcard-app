import { createSelector, Selector } from 'reselect'
import { createAction, handleActions, Action } from 'redux-actions'
import { allQuestions } from './course'
import iassign from '../utils/immutable'
import { State } from './index'

export interface FlashcardState {
  word: string
  meaning: string
  lastAnswer: Flashcard.LastAnswerType|null
  startTime: number|null
  endTime: number|null
}

export const types = {
  SUBMIT_ANSWER: 'FLASHCARD/SUBMIT_ANSWER',
  ANSWER_CORRECTLY: 'FLASHCARD/ANSWER_CORRECTLY',
  ANSWER_INCORRECTLY: 'FLASHCARD/ANSWER_INCORRECTLY',
  REQUEST_UPDATE_CARD: 'FLASHCARD/REQUEST_UPDATE_CARD',
  UPDATE_CARD: 'FLASHCARD/UPDATE_CARD'
}

// TODO: rework card to find question by id or something not have a copy of it
export const actions = {
  submit: createAction(types.SUBMIT_ANSWER, (answer: string) => answer),
  answerCorrectly: createAction(types.ANSWER_CORRECTLY, (answer: string) => answer),
  answerIncorrectly: createAction(types.ANSWER_INCORRECTLY, (answer: string) => answer),
  requestUpdateCard: createAction(types.REQUEST_UPDATE_CARD),
  updateCard: createAction(types.UPDATE_CARD, (question: Flashcard.Question) => question)
}

export const initialState = iassign.from({
  word: '',
  meaning: '',
  lastAnswer: null,
  startTime: null,
  endTime: null
})

export default handleActions<FlashcardState, string|Flashcard.Question>({
  [types.SUBMIT_ANSWER]: (state: FlashcardState, action: Action<string>) => (
    iassign(state, (newState: FlashcardState) => ({
      ...newState,
      endTime: Date.now()
    }))
  ),
  [types.ANSWER_CORRECTLY]: (state: FlashcardState, action: Action<string>) => (
    iassign(state, (newState: FlashcardState) => {
      newState.lastAnswer = {
        ...newState.lastAnswer,
        correct: true,
        answer: action.payload || ''
      }
      return newState
    })
  ),
  [types.ANSWER_INCORRECTLY]: (state: FlashcardState, action: Action<string>) => (
    iassign(state, (newState: FlashcardState) => {
      newState.lastAnswer = {
        ...newState.lastAnswer,
        answer: action.payload || '',
        correct: false
      }
      return newState
    })
  ),
  [types.UPDATE_CARD]: (state: FlashcardState, action: Action<Flashcard.Question>) => (
    iassign(state, (newState: FlashcardState) => ({
      ...newState,
      word: action.payload ? action.payload.word : '',
      meaning: action.payload ? action.payload.meaning : '',
      startTime: Date.now(),
      endTime: null
    }))
  )
}, initialState)

export const currentWord: Selector<State, string> = (state) => state.flashcard.word
export const currentMeaning: Selector<State, string> = (state) => state.flashcard.meaning
export const currentStartTime: Selector<State, number|null> = (state) => state.flashcard.startTime
export const currentEndTime: Selector<State, number|null> = (state) => state.flashcard.endTime
export const lastAnswer: Selector<State, Flashcard.LastAnswerType|null> = (state) => state.flashcard.lastAnswer

export const currentCard = createSelector<State, string, string, Flashcard.Question>(
  currentWord,
  currentMeaning,
  (word: string, meaning: string) => ({ word, meaning })
)

export const answerTime = createSelector(
  currentStartTime,
  currentEndTime,
  (startTime, endTime) => (startTime && endTime) ? endTime - startTime : null
)

export const currentQuestion = createSelector(
  allQuestions,
  currentCard,
  (questions, card) => {
    const wordIndex = questions.findIndex(question => ( question.word === card.word ))
    return wordIndex !== -1 ? questions.slice(wordIndex, wordIndex + 1)[0] : null
  }
)