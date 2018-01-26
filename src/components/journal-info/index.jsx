import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import Box from 'component/common/box'
import './journal-info.scss'

class JournalInfo extends React.Component {
  state = {
    expenses: this.analyzeExpenses(this.props),
  }

  analyzeExpenses(props) {
    // const content = this.props.contents[this.props.date]
    return null
  }

  render() {
    return (
      <Box flexColumn className="journal-info">
        <h2>{moment(this.props.date).format('MMM DD')}</h2>
      </Box>
    )
  }
}

export default connect(state => ({
  date: state.app.activeDate,
  contents: state.editor.date,
}))(JournalInfo)
