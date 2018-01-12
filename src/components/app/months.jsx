import React from 'react'
import moment from 'moment'
import classNames from 'classnames'

import Box from 'component/common/box'

const Months = ({ activeMonth, changeMonth }) => {
  const months = []
  const monthsToShow = 7
  const activeMonthIndex = Math.floor(monthsToShow / 2)

  for (let i = 0; i < 7; i++) {
    if (i < activeMonthIndex) {
      months.push(moment(activeMonth).subtract(activeMonthIndex - i, 'month'))
    } else if (i > activeMonthIndex) {
      months.push(moment(activeMonth).add(i - activeMonthIndex, 'month'))
    } else {
      months.push(moment(activeMonth))
    }
  }

  return (
    <Box flexColumn className="months-container" justifyContent="space-between">
      {months.map((month, i) => (
        <Box
          flexColumn
          className={classNames('month', { active: i === activeMonthIndex })}
          onClick={() => changeMonth(month)}
          key={i}>
          {i === activeMonthIndex ? (
            <Box flexRow justifyContent="space-between" alignItems="baseline">
              <span className="year">{month.format('YYYY')}</span>
              <span className="active-month">{month.format('MMM')}</span>
            </Box>
          ) : (
            month.format('MMM')
          )}
        </Box>
      ))}
    </Box>
  )
}

export default Months
