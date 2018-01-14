import React from 'react'
import ReactDOM from 'react-dom'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Provider } from 'react-redux'

import App from 'component/app'
import configureStore from './store'

import './index.scss'

const { persistor, store } = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      loading={<div className="loading">Loading the awesomeness</div>}
      persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
)
