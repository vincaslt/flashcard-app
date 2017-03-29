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

  declare type PropTypes = {
    card: CardType,
    submit: Function,
    lastAnswer: ?LastAnswerType
  }

  declare type StateType = {
    word: string,
    meaning: string,
    lastAnswer: ?LastAnswerType
  }

}