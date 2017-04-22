import { AnswerStatus } from '../constants'
import type { AnswerStatusType } from 'fl-course'

export function checkAnswer(
    submittedAnswer: string,
    realAnswer: string,
    answerTime: number
): AnswerStatusType {
  if (submittedAnswer.toLowerCase() === realAnswer.toLowerCase()) {
    if (answerTime <= 10*1000) {
      return AnswerStatus.GOOD
    }
    return AnswerStatus.OK
  }

  // TODO: OK status when some symbols are similar but wrong

  return AnswerStatus.BAD
}