declare module 'fl-course' {

  declare type CourseQuestionType = {
    word: string,
    meaning: string,
    answered: boolean
  }

  declare type StateType = {
    questions: Array<CourseQuestionType>,
    isLoading: boolean
  }

}