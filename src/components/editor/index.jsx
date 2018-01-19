import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import Editor from 'draft-js-plugins-editor'
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin'
import { EditorState, convertToRaw, convertFromRaw, RichUtils } from 'draft-js'
import debounce from 'lodash/debounce'
import { Bold, Italic, Underline } from 'react-feather'

import { addEntry, updateContent } from 'module/editor'
import Box from 'component/common/box'

import './editor.scss'

const plugins = [createMarkdownShortcutsPlugin()]

class EditorContainer extends React.Component {
  static EDITOR_OPTIONS = {
    mode: 'markdown',
    placeholder: "What's on your mind?",
  }

  constructor(props) {
    super(props)

    const date = moment(props.date).format('YYYY-MM-DD')
    const content = props.contents[date]
    this.state = {
      editorState: content
        ? EditorState.createWithContent(convertFromRaw(content.text))
        : EditorState.createEmpty(),
    }

    this.updateContent = debounce(this.props.updateContent, 200)
  }

  componentDidMount() {
    if (typeof this.props.content === 'undefined') {
      this.props.addEntry('Journal Entry', this.props.date)
    }
  }

  onChange = editorState => {
    this.setState({ editorState })
    this.updateContent(
      convertToRaw(editorState.getCurrentContent()),
      this.props.date,
    )
  }

  focusEditor = () => {
    this.refs.editor.focus()
  }

  toggleInlineStyle = (style) => e => {
    e.preventDefault()
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style))
    this.refs.editor.focus();
  }

  toggleBlockType = (style) => e => {
    e.preventDefault()
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, style))
    this.refs.editor.focus();
  }

  render() {
    const date = moment(this.props.date).format('YYYY-MM-DD')

    return (
      <Box flexColumn flexGrow={1} className="editor-container">
        <h1 className="editor-title">
          {this.props.contents[date] && this.props.contents[date].title}
        </h1>
        <Box flexRow>
          <div className="button-group">
            <button className="editor-action bold" onMouseDown={this.toggleInlineStyle('BOLD')}>B</button>
            <button className="editor-action italic" onMouseDown={this.toggleInlineStyle('ITALIC')}>I</button>
            <button className="editor-action underline" onMouseDown={this.toggleInlineStyle('UNDERLINE')}>U</button>
          </div>
          <span className="separator"></span>
          <div className="button-group">
            <button className="editor-action" onMouseDown={this.toggleBlockType('header-one')}>H1</button>
            <button className="editor-action" onMouseDown={this.toggleBlockType('header-two')}>H2</button>
            <button className="editor-action" onMouseDown={this.toggleBlockType('header-three')}>H3</button>
          </div>
        </Box>
        <Box
          flexColumn
          flexGrow={1}
          className="editor-wrapper"
          onClick={this.focusEditor}>
          <Editor
            ref="editor"
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            placeholder="What's on your mind?"
          />
        </Box>
      </Box>
    )
  }
}

export default connect(
  state => ({
    date: state.app.activeDate,
    contents: state.editor.date,
  }),
  dispatch => bindActionCreators({ addEntry, updateContent }, dispatch),
)(EditorContainer)
