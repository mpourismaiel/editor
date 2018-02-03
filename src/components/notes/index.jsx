import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { changeDate, changeMonth } from 'module/app'
import Box from 'component/common/box'
import './notes.scss'

class Notes extends React.Component {
  selectDate = date => () => {
    this.props.changeDate(moment(date))
    this.props.changeMonth(moment(date))
  }

  renderNotes() {
    return Object.keys(this.props.contents || {})
      .filter(date => !!this.props.contents[date].plainText)
      .sort((a, b) => (+moment(a) < +moment(b) ? 1 : -1))
      .slice(0, 30)
      .map(date => {
        const contents = this.props.contents[date].plainText || ''

        return (
          <Box
            flexColumn
            className="notes-entry"
            onClick={this.selectDate(date)}>
            <span className="title">
              {moment(date).format('MMM DD - dddd')}
            </span>
            <span className="description">
              {contents
                .slice(0, 60)
                .split('\u000A')
                .join(' ')}
            </span>
          </Box>
        )
      })
  }
  render() {
    return (
      <Box flexColumn className="notes-list">
        {this.renderNotes()}
      </Box>
    )
  }
}

export default connect(
  state => ({
    contents: state.editor.date,
  }),
  dispatch => bindActionCreators({ changeDate, changeMonth }, dispatch),
)(Notes)
