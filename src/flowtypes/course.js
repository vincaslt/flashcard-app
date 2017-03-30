import { WordStatus } from '../constants'

declare module 'fl-course' {

  declare type CourseQuestionType = {
    word: string,
    meaning: string,
    status: WordStatus
  }

  declare type StateType = {
    questions: Array<CourseQuestionType>,
    isLoading: boolean
  }

  declare type WordStatusType = $Keys<typeof WordStatus>

}