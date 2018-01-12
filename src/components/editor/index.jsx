import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CodeMirror from 'react-codemirror'

import { addEntry, updateContent } from 'module/editor'
import Box from 'component/common/box'
require('codemirror/mode/markdown/markdown')
require('codemirror/addon/display/placeholder')

import './codemirrror.scss'
import './editor.scss'

class Editor extends React.Component {
  static EDITOR_OPTIONS = {
    mode: 'markdown',
    placeholder: "What's on your mind?",
  }

  constructor(props) {
    super(props)

    this.updateText = this.updateText.bind(this)
  }

  componentDidMount() {
    if (typeof this.props.content === 'undefined') {
      this.props.addEntry('Journal Entry', this.props.date)
    }
  }

  updateText(content) {
    this.props.updateContent(this.props.content, this.props.date)
  }

  render() {
    return (
      <Box flexColumn flexGrow={1} className="editor-container">
        <h1 className="editor-title">
          {this.props.content && this.props.content.title}
        </h1>
        <CodeMirror
          value={(this.props.content && this.props.content.text) || ''}
          onChange={this.updateText}
          options={Editor.EDITOR_OPTIONS}
        />
      </Box>
    )
  }
}

export default connect(
  state => ({
    date: state.app.activeDate,
    content: state.editor.date[state.app.activeDate],
  }),
  dispatch => bindActionCreators({ addEntry, updateContent }, dispatch),
)(Editor)
