// @flow

import { combineReducers } from 'redux'
import flashcard from './flashcard'
import course from './course'

// main reducers
export const reducers = combineReducers({
  flashcard,
  course
})
