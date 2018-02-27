import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import DatePicker from 'component/datepicker'
import Box from 'component/common/box'
import Notes from 'component/notes'
import Navigation from 'component/navigation'
import Editor from 'component/editor'
import JournalInfo from 'component/journal-info'
import './styles.scss'

class App extends React.Component {
  renderJournalSidebar() {
    return (
      <Box flexColumn className="sidebar">
        <Box flexColumn flexGrow={1}>
          <h1 className="logo">The Journal</h1>
          <Notes />
        </Box>
        <DatePicker />
      </Box>
    )
  }

  render() {
    return (
      <Box flexRow className="viewport">
        <Navigation />
        <Switch>
          <Route exact path="/journal" render={this.renderJournalSidebar} />
        </Switch>
        <Box flexRow flexGrow={1} justifyContent="center">
          <Editor key={`editor-${this.props.selectedDate}`} />
          <JournalInfo key={`journal-${this.props.selectedDate}`} />
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
