// @flow

import type { ActionType } from 'fl-types'
import type { RepetitionConfigType, StateType } from 'fl-settings'

export const types = {}

export const actions = {}

// TODO: get repetition config from API
export const initialState = {
  repetition: {
    bad: 0,
    new: '1 minute',
    fresh: '2 minutes',
    average: '5 minutes',
    old: '10 minutes'
  }
}

// FIXME: rework to immutable
export default (state: StateType = initialState, { type, payload }: ActionType) => {
  switch (type) {
    default:
      return state
  }
}

export const getRepetitionConfig = (state: Object): RepetitionConfigType => state.settings.repetition
