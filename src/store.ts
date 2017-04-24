import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import iassign from './utils/immutable'
import { reducers, locallyStoredState } from './reducers'
import { sagas } from './sagas'
import { composeWithDevTools } from 'redux-devtools-extension'

const persistState = require('redux-localstorage') // FIXME: ES6 import when types are defined

// add the middlewares
let middlewares = []

// add the saga middleware
const sagaMiddleware = createSagaMiddleware()
middlewares.push(sagaMiddleware)

// apply the middleware
let middleware = applyMiddleware(...middlewares)
middleware = compose(middleware, persistState(locallyStoredState, {
  key: 'flashcardApp',
  deserialize: (serializedData: string) => iassign.from(JSON.parse(serializedData))
}))

// add the redux dev tools
if (process.env.NODE_ENV !== 'production') {
  middleware = composeWithDevTools(middleware)
}

// create the store
const store = createStore(reducers, middleware)
sagaMiddleware.run(sagas)

export { store }
