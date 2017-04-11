// @flow

import { combineReducers } from 'redux'
import flashcard from './flashcard'
import course from './course'
import settings from './settings'

export const locallyStoredState = [
  'course',
  'settings'
]

// main reducers
export const reducers = combineReducers({
  flashcard,
  course,
  settings
})
