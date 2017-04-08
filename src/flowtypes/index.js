import type { StateType as CourseState } from 'fl-course'
import type { StateType as FlashcardState } from 'fl-flashcard'
import type { StateType as SettingsState } from 'fl-settings'

declare module 'fl-types' {

  declare type ActionType = {
    type: string,
    payload: ?Object
  }

  declare type StateType = {
    course: CourseState,
    flashcard: FlashcardState,
    settings: SettingsState
  }

}
