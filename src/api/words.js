import course from './course.json'
import Promise from 'bluebird'

// FIXME: it's only temporary
export function getWords() {
  return Promise.resolve(course.levels[0].words)
}