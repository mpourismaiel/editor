import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { init } from './redux/app'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  componentDidMount() {
    this.props.init()
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React/Electron</h2>
        </div>
        <p className="App-intro">Hello Electron!</p>
        <p>{`App initialized: ${this.props.initialized}`}</p>
      </div>
    )
  }
}

export default connect(
  state => ({ initialized: state.app.initialized }),
  dispatch => bindActionCreators({ init }, dispatch),
)(App)
