import flashcard from './flashcard'
import course from './course'

export function* sagas () {
  yield [
    ...flashcard,
    ...course
  ]
}
