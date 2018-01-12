import React from 'react'
import moment from 'moment'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Calendar } from 'react-jdate-picker'

import { init } from 'module/app'
import Box from 'component/common/box'
import Months from './months'
import './app.scss'

class App extends React.Component {
  static WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  constructor(props) {
    super(props)

    this.state = { activeMonth: moment(), selectedDate: moment() }
  }

  changeDisplay(fn) {
    this.setState({
      activeMonth: moment(this.state.activeMonth)[fn](1, 'month'),
    })
  }

  selectDate(selectedDate) {
    this.setState({ selectedDate })
  }

  changeMonth(activeMonth) {
    this.setState({ activeMonth })
  }

  goToday() {
    this.changeMonth(moment())
    this.selectDate(moment())
  }

  renderDay(date, onClick) {
    const isSelected = date.isSame(this.state.selectedDate, 'day')
    return (
      <div
        className={classNames('calendar-day', {
          disabled: !date.isSame(this.state.activeMonth, 'month'),
          selected: isSelected,
        })}
        onClick={onClick}
        key={date.format('MM-DD')}>
        <div className="day-box">
          <div className="day-title">{moment(date).format('DD')}</div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="datepicker-container">
        <Box flexRow>
          <Box flexColumn className="month-picker">
            <span className="go-today" onClick={() => this.goToday()}>
              Today
            </span>
            <Months
              activeMonth={this.state.activeMonth.format('YYYY-MM-DD')}
              changeMonth={date => this.changeMonth(date)}
            />
          </Box>
          <Calendar
            isSelectable={date =>
              moment(date).isSameOrBefore(this.state.activeMonth)
            }
            isSelected={() => false}
            displayDate={this.state.activeMonth}
            changeDisplay={fn => this.changeDisplay(fn)}
            selectDate={date => this.selectDate(date)}
            dayTemplate={(date, onClick) => this.renderDay(date, onClick)}
            weekdays={App.WEEKDAYS}
          />
        </Box>
      </div>
    )
  }
}

export default connect(
  state => ({ initialized: state.app.initialized }),
  dispatch => bindActionCreators({ init }, dispatch),
)(App)
