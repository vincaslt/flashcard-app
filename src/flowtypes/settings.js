// @flow

declare module 'fl-settings' {

  declare type RepetitionConfigType = {
    bad: number | string,
    new: number | string,
    fresh: number | string,
    average: number | string,
    old: number | string,
  }

  declare type StateType = {
    repetition: RepetitionConfigType
  }

}