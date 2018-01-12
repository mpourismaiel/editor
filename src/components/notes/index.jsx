import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Box from 'component/common/box'
import './notes.scss'

class Notes extends React.Component {
  render() {
    return (
      <Box flexColumn className="notes-list">
        <Box flexRow className="notes-journal">
          <span className="title">Journal Entry</span>
        </Box>
        <Box flexRow className="notes-entry">
          <span className="title">Code of the day</span>
        </Box>
      </Box>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => bindActionCreators({}, dispatch),
)(Notes)
