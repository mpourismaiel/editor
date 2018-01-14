import { createLogger } from 'redux-logger'
import { applyMiddleware, createStore, compose } from 'redux'
import { persistStore } from 'redux-persist'

import reducers from 'module'

const logger = createLogger({
  collapsed: true,
  duration: true,
  timestamp: true,
  level: 'info',
  diff: true,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
  const store = createStore(reducers, composeEnhancers(applyMiddleware(logger)))
  const persistor = persistStore(store)

  return { persistor, store }
}
