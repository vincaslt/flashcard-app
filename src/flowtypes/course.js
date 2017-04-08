import { WordStatus } from '../constants'

declare module 'fl-course' {

  declare type CourseQuestionType = {
    word: string,
    meaning: string,
    status: WordStatus,
    nextDate: Date
  }

  declare type StateType = {
    questions: Array<CourseQuestionType>,
    isLoading: boolean,
    complete: boolean
  }

  declare type WordStatusType = $Keys<typeof WordStatus>

}