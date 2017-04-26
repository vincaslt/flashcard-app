import { AnswerStatus } from '../constants'

export function checkAnswer(
    submittedAnswer: string,
    realAnswer: string,
    answerTime: number
): AnswerStatus {
  if (submittedAnswer.toLowerCase() === realAnswer.toLowerCase()) {
    if (answerTime <= 10 * 1000) {
      return AnswerStatus.GOOD
    }
    return AnswerStatus.OK
  }

  // TODO: OK status when some symbols are similar but wrong

  return AnswerStatus.BAD
}