declare module "*.json" {
  const value: any
  export default value
}

declare module "*.svg" {
  const value: string
  export default value
}


// FIXME: ffs how can this not have typings god damnit
declare module 'redux-devtools-extension' {
  const composeWithDevTools: {
    (middleware: any): any
  }
  export { composeWithDevTools }
}

declare namespace Course {
  type WordStatus = 'new' | 'bad' | 'fresh' | 'average' | 'old' | 'never'

  interface Question {
    word: string
    meaning: string
    status: WordStatus
    nextDate: Date|null
  }
}

// TODO: FIXME: This is redundant, use ID to select from questions
declare namespace Flashcard {
  interface Question {
    word: string
    meaning: string
  }

  interface LastAnswerType {
    word: string
    answer: string
    correct: boolean
  }
}
