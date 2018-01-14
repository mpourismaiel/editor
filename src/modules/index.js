import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { reducer as app } from './app'
import { reducer as editor } from './editor'

const config = {
  key: 'root',
  storage,
}

export default persistCombineReducers(config, {
  app,
  editor,
})
