const course = require('./course.json') // FIXME: same shit
import * as Promise from 'bluebird'

interface Word {
  word: string
  meaning: string
}

interface Level {
  name: string
  words: Word[]
}

// FIXME: it's only temporary until API
export function getWords(): Promise<Course.Question[]> {
  return Promise.resolve(course.levels.reduce(
    (arr: Word[], { words }: Level) => arr.concat(words),
    []
  ))
    .then((words: Flashcard.Question[]) => (
      words.map<Course.Question>(word => ({
        ...word,
        status: 'new',
        nextDate: null
      }))
    ))
}