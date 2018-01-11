import { createLogger } from 'redux-logger'
import { applyMiddleware, createStore, compose } from 'redux'
import reducers from '../redux'

const logger = createLogger({
  collapsed: true,
  duration: true,
  timestamp: true,
  level: 'info',
  diff: true,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(reducers, composeEnhancers(applyMiddleware(logger)))
