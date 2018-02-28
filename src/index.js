import React from 'react'
import ReactDOM from 'react-dom'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Provider } from 'react-redux'
import { Switch, Router, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import App from 'component/app'
import NotesEditor from 'component/notes-editor'
import configureStore from './store'

import './index.scss'

const { persistor, store } = configureStore()
const history = createBrowserHistory()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      loading={<div className="loading">Loading the awesomeness</div>}
      persistor={persistor}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route
            exact
            path="/(journal|notes)/:month?/:date?"
            component={NotesEditor}
          />
        </Switch>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
)
