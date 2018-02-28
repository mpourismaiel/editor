import React from 'react'
import moment from 'moment'
import { Switch, Route, withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { changeDate, changeMonth } from 'module/app'
import DatePicker from 'component/datepicker'
import Box from 'component/common/box'
import Notes from 'component/notes'
import Navigation from 'component/navigation'
import Editor from 'component/editor'
import JournalInfo from 'component/journal-info'
import './styles.scss'

class App extends React.Component {
  componentDidMount() {
    const today = moment()
    const { date, month } = this.props.match.params
    if (!date || !month) {
      this.props.push(`/journal/${today.month() + 1}/${today.date()}`)
    } else {
      this.props.changeMonth(moment().month(month))
      this.props.changeDate(
        moment()
          .month(month)
          .date(date),
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    const today = moment()
    const {
      date = today.date(),
      month = today.month(),
    } = this.props.match.params
    const { date: nextDate, month: nextMonth } = nextProps.match.params

    if (month !== nextMonth) {
      this.props.changeMonth(month)
      this.props.changeDate(
        moment()
          .month(month)
          .date(date),
      )
    }
    if (date !== nextDate) {
      this.props.changeDate(
        moment()
          .month(month)
          .date(date),
      )
    }
  }

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
          <Route
            exact
            path="/journal/:month?/:date?"
            render={this.renderJournalSidebar}
          />
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

export default withRouter(
  connect(
    state => ({
      open: state.app.datepickerOpen,
      selectedDate: state.app.activeDate,
    }),
    dispatch => bindActionCreators({ changeDate, changeMonth, push }, dispatch),
  )(App),
)
