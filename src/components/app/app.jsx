import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CodeMirror from 'react-codemirror'

require('codemirror/mode/markdown/markdown')

import { init } from 'module/app'
import './app.scss'
import './codemirrror.scss'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '# Hello World!\n\nWelcome to my new **Editor**!',
    }
    this.updateCode = this.updateCode.bind(this)
  }

  componentDidMount() {
    this.props.init()
  }

  updateCode(newCode) {
    this.setState({
      code: newCode,
    })
  }

  render() {
    var options = {
      mode: 'markdown',
    }
    return (
      <CodeMirror
        value={this.state.code}
        onChange={this.updateCode}
        options={options}
      />
    )
  }
}

export default connect(
  state => ({ initialized: state.app.initialized }),
  dispatch => bindActionCreators({ init }, dispatch),
)(App)
