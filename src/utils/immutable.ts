import * as iassign from 'immutable-assign'

interface Immutable extends ImmutableAssign.IIassign {
  from: <T>(obj: T) => T
}

let immutable: Immutable = Object.assign(
  iassign,
  {
    from<T>(obj: T) {
      return immutable(obj, (o: T) => o)
    }
  }, 
  {
    freeze: true,
    disableExtraStatementCheck: true
  }
)

export default immutable