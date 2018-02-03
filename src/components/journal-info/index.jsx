import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import Box from 'component/common/box'
import { TwoLevelPieChart } from 'component/journal-info/pie-chart'
import regexes from 'utils/regexes'
import { formatPrice } from 'utils/price'
import './journal-info.scss'

class JournalInfo extends React.Component {
  state = {
    expenses: {},
  }

  analyzeTransactions(content, type) {
    if (content && content.text && content.text.blocks) {
      return content.text.blocks
        .filter(
          block =>
            block.type === 'unstyled' &&
            block.text.match(regexes.price) !== null &&
            block.text[0] === (type === 'expense' ? '-' : '+'),
        )
        .map(block => {
          return block.text
        })
        .reduce((tmp, text) => {
          const unit = text.match(/[a-z$]+/i)
          const key = !!unit ? unit[0] : 'default'

          if (!tmp[key]) {
            tmp[key] = {}
          }

          const price = parseInt(text.match(/\d+/)[0], 10)
          const hashtags = text.match(new RegExp(regexes.hashtag, 'g'))
          if (hashtags) {
            hashtags.forEach(tag => {
              if (!tmp[key][tag]) {
                tmp[key][tag] = 0
              }

              tmp[key][tag] += price
            })
          } else {
            if (!tmp[key]['!']) {
              tmp[key]['!'] = 0
            }

            tmp[key]['!'] += price
          }
          return tmp
        }, {})
    }

    return null
  }

  renderChart() {
    return Object.keys(this.state.expenses).map(unit => {
      return (
        <TwoLevelPieChart
          data={Object.keys(this.state.expenses[unit]).reduce((tmp, tag) => {
            tmp.push({
              value: this.state.expenses[unit][tag],
              name: tag,
            })

            return tmp
          }, [])}
        />
      )
    })
  }

  calculateTransactions(transactions) {
    return Object.keys(transactions).reduce((tmp, unit) => {
      tmp.push(
        <span key={unit} className="value">
          {formatPrice(
            `${Object.keys(transactions[unit]).reduce(
              (sum, tag) => (sum += transactions[unit][tag]),
              0,
            )}${unit}`,
          )}
        </span>,
      )
      return tmp
    }, [])
  }

  render() {
    const todayExpenses = this.analyzeTransactions(
      this.props.contents[moment(this.props.date).format('YYYY-MM-DD')],
      'expense',
    )
    const todayIncomes = this.analyzeTransactions(
      this.props.contents[moment(this.props.date).format('YYYY-MM-DD')],
      'income',
    )

    return (
      <Box flexColumn className="journal-info">
        <h2>{moment(this.props.date).format('MMM DD')}</h2>
        <Box
          flexRow
          className="incomes"
          shouldRender={!!Object.keys(todayIncomes || {}).length}>
          <Box flexColumn className="title-container">
            <span className="title">Incomes</span>
          </Box>
          <Box flexColumn className="value-container">
            {this.calculateTransactions(todayIncomes || {})}
          </Box>
        </Box>
        <Box
          flexRow
          className="expenses"
          shouldRender={!!Object.keys(todayExpenses || {}).length}>
          <Box flexColumn className="title-container">
            <span className="title">Expenses</span>
          </Box>
          <Box flexColumn className="value-container">
            {this.calculateTransactions(todayExpenses || {})}
          </Box>
        </Box>
      </Box>
    )
  }
}

export default connect(state => ({
  date: state.app.activeDate,
  contents: state.editor.date,
}))(JournalInfo)
