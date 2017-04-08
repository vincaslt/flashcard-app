// @flow

import type { ActionType, StateType } from 'fl-types'
import type { RepetitionConfigType, StateType as SettingsState } from 'fl-settings'
import Immutable from 'seamless-immutable'
import type { Immutable as ImmutableType } from 'fl-seamless-immutable'

export const types = {}

export const actions = {}

// TODO: get repetition config from API
export const initialState = Immutable({
  repetition: {
    bad: 0,
    new: '1 minute',
    fresh: '2 minutes',
    average: '5 minutes',
    old: '10 minutes'
  }
})

export default (state: ImmutableType<SettingsState> = initialState, { type, payload }: ActionType) => {
  switch (type) {
    default:
      return state
  }
}

export const getRepetitionConfig = (state: StateType): RepetitionConfigType => state.settings.repetition
