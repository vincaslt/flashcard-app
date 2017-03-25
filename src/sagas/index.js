import flashcard from './flashcard'

export function* sagas () {
  yield [
    ...flashcard
  ]
}
