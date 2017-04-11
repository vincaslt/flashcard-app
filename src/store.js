import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import persistState from 'redux-localstorage'
import Immutable from 'seamless-immutable'
import { reducers, locallyStoredState } from './reducers'
import { sagas } from './sagas'

// add the middlewares
let middlewares = []

// add the saga middleware
const sagaMiddleware = createSagaMiddleware()
middlewares.push(sagaMiddleware)

// apply the middleware
let middleware = applyMiddleware(...middlewares)

middleware = compose(middleware, persistState(locallyStoredState, {
  key: 'flashcardApp',
  deserialize: (serializedData: string) => Immutable(JSON.parse(serializedData))
}))

// add the redux dev tools
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension())
}

// create the store
const store = createStore(reducers, middleware)
sagaMiddleware.run(sagas)

export { store }
