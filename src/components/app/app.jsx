import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { init } from 'module/app'
import logo from 'asset/imgs/logo.svg'
import './app.scss'

class App extends Component {
  componentDidMount() {
    this.props.init()
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h2>Welcome to React/Electron</h2>
        </div>
        <p className="app-intro">Hello Electron!</p>
        <p>{`app initialized: ${this.props.initialized}`}</p>
      </div>
    )
  }
}

export default connect(
  state => ({ initialized: state.app.initialized }),
  dispatch => bindActionCreators({ init }, dispatch),
)(App)
