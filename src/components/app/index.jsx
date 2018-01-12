import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import DatePicker from 'component/datepicker'
import Box from 'component/common/box'
import Notes from 'component/notes'
import './app.scss'

class App extends React.Component {
  render() {
    return (
      <Box flexRow className="viewport">
        <Box flexColumn className="sidebar">
          <Box flexColumn flexGrow={1}>
            <h1 className="logo">The Journal</h1>
            <Notes />
          </Box>
          <DatePicker />
        </Box>
        <div hidden={!this.props.open}>
          <DatePicker open={this.props.open} />
        </div>
      </Box>
    )
  }
}

export default connect(
  state => ({
    open: state.app.datepickerOpen,
    selectedDate: state.app.activeDate,
  }),
  dispatch => bindActionCreators({}, dispatch),
)(App)
