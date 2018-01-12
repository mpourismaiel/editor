import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import DatePicker from 'component/datepicker'
import Box from 'component/common/box'
import Notes from 'component/notes'
import './app.scss'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { datepickerOpen: false }
  }

  render() {
    return (
      <Box flexRow className="viewport">
        <Box flexColumn className="sidebar">
          <Box flexColumn flexGrow={1}>
            <h1 className="logo">The Journal</h1>
            <Notes />
          </Box>
          <DatePicker open={this.state.datepickerOpen} />
        </Box>
      </Box>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => bindActionCreators({}, dispatch),
)(App)
