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

    this.state = { activeMonth: moment() }
    this.changeMonth = this.changeMonth.bind(this)
    this.renderDay = this.renderDay.bind(this)
  }

  changeMonth(activeMonth) {
    this.setState({ activeMonth })
  }

  renderDay(date) {
    return (
      <div
        className={classNames('calendar-day', {
          disabled: !date.isSame(this.state.activeMonth, 'month'),
        })}
        key={date.format('MM-DD')}>
        <div className="day-title">{moment(date).format('DD')}</div>
      </div>
    )
  }

  render() {
    return (
      <div className="datepicker-container">
        <Box flexRow>
          <Box flexColumn className="month-picker">
            <span
              className="go-today"
              onClick={() => this.changeMonth(moment())}>
              Today
            </span>
            <Months
              activeMonth={this.state.activeMonth.format('YYYY-MM-DD')}
              changeMonth={this.changeMonth}
            />
          </Box>
          <Calendar
            isSelectable={date =>
              moment(date).isSameOrBefore(this.state.activeMonth)
            }
            isSelected={() => false}
            displayDate={this.state.activeMonth}
            changeDisplay={() => null}
            selectDate={() => null}
            dayTemplate={this.renderDay}
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
