import { combineReducers } from 'redux'
import flashcard from './flashcard'
import course from './course'
import settings from './settings'

import { FlashcardState } from './flashcard'
import { SettingsState } from './settings'
import { CourseState } from './course'

export interface State {
  course: CourseState
  flashcard: FlashcardState
  settings: SettingsState
}

// Parts of the state that is saved to local storage
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
