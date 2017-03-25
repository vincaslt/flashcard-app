// @flow

import { combineReducers } from 'redux'
import flashcard from './flashcard'

export type ActionType = {
  type: string,
  payload: ?Object
}

// main reducers
export const reducers = combineReducers({
  flashcard
})
