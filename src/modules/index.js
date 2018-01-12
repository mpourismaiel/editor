import { combineReducers } from 'redux'

import { reducer as app } from './app'
import { reducer as editor } from './editor'

export default combineReducers({
  app,
  editor,
})
