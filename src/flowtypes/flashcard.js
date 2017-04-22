// @flow

declare module 'fl-flashcard' {

  declare type CardType = {
    word: string,
    meaning: string
  }

  declare type LastAnswerType = {
    word: string,
    answer: string,
    correct: boolean
  }

  declare type StateType = {
    word: string,
    meaning: string,
    lastAnswer: ?LastAnswerType,
    startTime: ?number,
    endTime: ?number
  }

}