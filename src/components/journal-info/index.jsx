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

  analyzeTransactionsByTags(content, type) {
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
            tmp[key] = 0
          }

          const price = parseInt(text.match(/\d+/)[0], 10)
          tmp[key] += price
          return tmp
        }, {})
    }

    return null
  }

  calculcateTransactions(transactions) {
    if (!transactions || !Object.keys(transactions).length) {
      return 0
    }

    return Object.keys(transactions).reduce(
      (sum, unit) => (sum += transactions[unit]),
      0,
    )
  }

  render() {
    const content = this.props.contents[
      moment(this.props.date).format('YYYY-MM-DD')
    ]

    const todayExpenses = this.analyzeTransactions(content, 'expense') || {}
    const todayIncomes = this.analyzeTransactions(content, 'income') || {}

    return (
      <Box flexColumn className="journal-info">
        <h2>{moment(this.props.date).format('MMM DD')}</h2>
        <Box
          flexRow
          className="incomes"
          shouldRender={this.calculcateTransactions(todayIncomes) > 0}>
          <Box flexColumn className="title-container">
            <span className="title">Incomes</span>
          </Box>
          <Box flexColumn className="value-container">
            {Object.keys(todayIncomes).map(
              unit => (
                <span key={unit} className="value">
                  {formatPrice(`${todayIncomes[unit]}${unit}`)}
                </span>
              ),
              [],
            )}
          </Box>
        </Box>
        <Box
          flexRow
          className="expenses"
          shouldRender={this.calculcateTransactions(todayExpenses) > 0}>
          <Box flexColumn className="title-container">
            <span className="title">Expenses</span>
          </Box>
          <Box flexColumn className="value-container">
            {Object.keys(todayExpenses).map(
              unit => (
                <span key={unit} className="value">
                  {formatPrice(`${todayExpenses[unit]}${unit}`)}
                </span>
              ),
              [],
            )}
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
