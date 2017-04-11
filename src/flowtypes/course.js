import { WordStatus, AnswerStatus } from '../constants'
import type { Immutable } from 'fl-seamless-immutable'

declare module 'fl-course' {

  declare type CourseQuestionType = {
    word: string,
    meaning: string,
    status: WordStatus,
    nextDate: Date
  }

  declare type StateType = {
    questions: Immutable<Array<CourseQuestionType>>,
    isLoading: boolean,
    complete: boolean
  }

  declare type WordStatusType = $Keys<typeof WordStatus>

  declare type AnswerStatusType = $Keys<typeof AnswerStatus>

}