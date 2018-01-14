import React from 'react'
import moment from 'moment'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Calendar } from 'react-jdate-picker'
import { Maximize2 } from 'react-feather'

import { changeDate, changeMonth, toggleDatepicker } from 'module/app'
import Box from 'component/common/box'
import Months from './months'
import './datepicker.scss'

class DatePicker extends React.Component {
  static WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  constructor(props) {
    super(props)

    this.state = {
      selectedDate: this.props.selectedDate,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.selectedDate.isSame(this.state.selectedDate)) {
      this.setState({ selectedDate: nextProps.selectedDate })
    }
  }

  selectDate(selectedDate) {
    if (this.props.open && this.state.selectedDate.isSame(selectedDate)) {
      this.props.changeDate(selectedDate)
      this.props.toggleDatepicker()
    } else if (!this.props.open) {
      this.props.changeDate(selectedDate)
      this.setState({ selectedDate })
    } else {
      this.setState({ selectedDate })
    }
  }

  changeMonth(activeMonth) {
    this.props.changeMonth(activeMonth)
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
          disabled: !date.isSame(this.props.activeMonth, 'month'),
          selected: isSelected,
        })}
        onClick={e => {
          e.stopPropagation()
          onClick()
        }}
        key={date.format('MM-DD')}>
        <div className="day-box">
          <div className="day-title">{moment(date).format('DD')}</div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div
        onClick={this.props.open ? this.props.toggleDatepicker : () => null}
        className={classNames('datepicker-container', {
          open: this.props.open,
        })}>
        <Box flexColumn>
          <Box flexRow className="month-picker">
            <Months
              activeMonth={moment(this.props.activeMonth).format('YYYY-MM-DD')}
              changeMonth={date => this.props.changeMonth(date)}
              displayList={this.props.open}
              toggleDatepicker={this.props.toggleDatepicker}
            />
            <span
              className="go-today"
              onClick={e => {
                e.stopPropagation()
                this.goToday()
              }}>
              Today
            </span>
            {!this.props.open && (
              <span
                className="expand"
                onClick={e => {
                  e.stopPropagation()
                  this.props.toggleDatepicker()
                }}>
                <Maximize2
                  style={{ width: '16px', transform: 'translateY(-3px)' }}
                />
              </span>
            )}
          </Box>
          <Calendar
            isSelectable={date =>
              moment(date).isSameOrBefore(this.props.activeMonth)
            }
            isSelected={() => false}
            displayDate={this.props.activeMonth}
            changeDisplay={fn => this.changeDisplay(fn)}
            selectDate={date => this.selectDate(date)}
            dayTemplate={(date, onClick) => this.renderDay(date, onClick)}
            weekdays={DatePicker.WEEKDAYS}
          />
        </Box>
      </div>
    )
  }
}

export default connect(
  state => ({
    selectedDate: state.app.activeDate,
    activeMonth: state.app.activeMonth,
  }),
  dispatch =>
    bindActionCreators({ changeDate, changeMonth, toggleDatepicker }, dispatch),
)(DatePicker)
