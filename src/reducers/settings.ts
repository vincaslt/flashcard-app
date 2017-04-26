import { handleActions } from 'redux-actions'
import { State } from './index'
import { Selector } from 'reselect'
import iassign from '../utils/immutable'

export type RepetitionConfig = {
  bad: string|number
  new: string|number
  fresh: string|number
  average: string|number
  old: string|number
}

export type SettingsState = {
  repetition: RepetitionConfig
}

export const types = {}

export const actions = {}

// TODO: get repetition config from API
export const initialState: SettingsState = iassign.from({
  repetition: {
    bad: 0,
    new: '1 minute',
    fresh: '2 minutes',
    average: '5 minutes',
    old: '10 minutes'
  }
})

export default handleActions({}, initialState)

export const repetitionConfig: Selector<State, RepetitionConfig> = (state) => state.settings.repetition
