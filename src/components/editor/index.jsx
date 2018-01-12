import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CodeMirror from 'react-codemirror'

require('codemirror/mode/markdown/markdown')

import './editor.scss'

class Editor extends React.Component {
  state = {
    content: '',
  }

  updateText(content) {
    this.setState({ content })
  }

  render() {
    var options = {
      mode: 'markdown',
    }
    return (
      <CodeMirror
        value={this.state.content}
        onChange={this.updateText}
        options={options}
      />
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
