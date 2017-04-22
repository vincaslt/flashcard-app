import course from './course.json'
import Promise from 'bluebird'
import { WordStatus } from '../constants'

// FIXME: it's only temporary
export function getWords() {
  return Promise.resolve(course.levels[0].words)
    .then(words => words.map(word => ({
      ...word,
      status: WordStatus.NEW,
      nextDate: null
    })))
}