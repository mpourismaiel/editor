import React from 'react'
import moment from 'moment'
import classNames from 'classnames'

import Box from 'component/common/box'

const Months = ({
  activeMonth,
  changeMonth,
  displayList,
  toggleDatepicker,
}) => {
  const months = []
  const monthsToShow = displayList ? 7 : 1
  const activeMonthIndex = Math.floor(monthsToShow / 2)

  for (let i = 0; i < monthsToShow; i++) {
    if (i < activeMonthIndex) {
      months.push(moment(activeMonth).subtract(activeMonthIndex - i, 'month'))
    } else if (i > activeMonthIndex) {
      months.push(moment(activeMonth).add(i - activeMonthIndex, 'month'))
    } else {
      months.push(moment(activeMonth))
    }
  }

  return (
    <Box flexRow className="months-container" justifyContent="space-between">
      {!displayList && (
        <Box
          flexColumn
          onClick={e => {
            e.stopPropagation()
            changeMonth(moment(activeMonth).subtract(1, 'month'))
          }}
          className="change-month">
          {'<'}
        </Box>
      )}
      {months.map((month, i) => (
        <Box
          flexRow
          justifyContent="center"
          alignItems="center"
          className={classNames('month', { active: i === activeMonthIndex })}
          onClick={e => {
            e.stopPropagation()
            changeMonth(month)
          }}
          key={i}>
          {i === activeMonthIndex ? (
            <Box flexColumn justifyContent="center" alignItems="center">
              <span className="year">{month.format('YYYY')}</span>
              <span className="active-month">{month.format('MMM')}</span>
            </Box>
          ) : (
            month.format('MMM')
          )}
        </Box>
      ))}
      {!displayList && (
        <Box
          flexColumn
          onClick={e => {
            e.stopPropagation()
            changeMonth(moment(activeMonth).add(1, 'month'))
          }}
          className="change-month">
          {'>'}
        </Box>
      )}
    </Box>
  )
}

export default Months
