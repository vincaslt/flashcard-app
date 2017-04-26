const course = require('./course.json') // FIXME: same shit
import * as Promise from 'bluebird'

// FIXME: it's only temporary until API
export function getWords(): Promise<Course.Question[]> {
  return Promise.resolve(course.levels[0].words)
    .then((words: Flashcard.Question[]) => (
      words.map<Course.Question>(word => ({
        ...word,
        status: 'new',
        nextDate: null
      }))
    ))
}