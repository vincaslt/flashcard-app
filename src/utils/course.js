import { AnswerStatus } from '../constants'
import type { AnswerStatusType } from 'fl-course'

export function checkAnswer(submittedAnswer: string, realAnswer: string): AnswerStatusType {
  if (submittedAnswer.toLowerCase() === realAnswer.toLowerCase()) {
    return AnswerStatus.GOOD
  }

  // TODO: more advanced checks and OK status

  return AnswerStatus.BAD
}