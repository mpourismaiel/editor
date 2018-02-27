import React from 'react'
import moment from 'moment'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import Box from 'component/common/box'
import Navigation from 'component/navigation'
import './styles.scss'

class App extends React.Component {
  renderNotes() {
    return [
      {
        id: 0,
        title: 'Journal - 2018-02-28',
        excerpt:
          "Some content to fill up the void in this space that we can see and we don't want to see. Some content to fill up the void in this space that we can see and we don't want to see. Some content to fill up the void in this space that we can see and we don't want to see...",
      },
      {
        id: 1,
        title: 'Ideas on the editor',
        excerpt:
          "Some content to fill up the void in this space that we can see and we don't want to see. Some content to fill up the void in this space that we can see and we don't want to see. Some content to fill up the void in this space that we can see and we don't want to see...",
      },
      {
        id: 2,
        title: 'Journal - 2018-02-27',
        excerpt:
          "Some content to fill up the void in this space that we can see and we don't want to see. Some content to fill up the void in this space that we can see and we don't want to see. Some content to fill up the void in this space that we can see and we don't want to see...",
      },
    ]
      .map(note => (
        <Box flexColumn className="note" key={note.id}>
          <h4>{note.title}</h4>
          <p>{note.excerpt}</p>
        </Box>
      ))
      .concat([
        <Link to="" key="notes-load-more">
          <Box flexRow className="load-more">
            Load More...
          </Box>
        </Link>,
      ])
  }

  renderTodos() {
    return [
      {
        date: '2018-02-27',
        todos: [
          { title: 'Add dashboard to editor', done: true },
          { title: 'Design the dashboard of the editor', done: false },
        ],
      },
    ]
      .map(todosContainer => (
        <Box
          flexColumn
          className="todos-by-date"
          key={`todos-${todosContainer.date}`}>
          <h4>{moment(todosContainer.date).format('MMMM DD, dddd')}</h4>
          <Box flexColumn className="list-items">
            {todosContainer.todos.map(todo => (
              <Box flexRow className="todo checkbox" key={`todo-${todo.title}`}>
                <span className={classNames('check', { checked: todo.done })} />
                {todo.title}
              </Box>
            ))}
          </Box>
        </Box>
      ))
      .concat([
        <Link to="" key="todos-load-more">
          <Box flexRow className="load-more">
            Load More...
          </Box>
        </Link>,
      ])
  }

  renderTransactions() {
    return [
      {
        date: '2018-02-27',
        transactions: [
          { amount: -20000, title: 'Bought that' },
          { amount: -15000, title: 'Ate #launch at @13Cafe' },
        ],
      },
      {
        date: '2018-02-26',
        transactions: [{ amount: 4000000, title: '#Salary' }],
      },
    ]
      .map(transactionContainer => (
        <Box
          flexColumn
          className="transactions-by-date"
          key={`transactions-${transactionContainer.date}`}>
          <h4>{moment(transactionContainer.date).format('MMMM DD, dddd')}</h4>
          <Box flexColumn className="list-items">
            {transactionContainer.transactions.map(transaction => (
              <Box
                flexRow
                className={classNames('transaction', {
                  expense: parseInt(transaction.amount, 10) < 0,
                  income: parseInt(transaction.amount, 10) > 0,
                })}
                key={`trasaction-${transaction.title}-${transaction.amount}`}>
                <b>{transaction.amount}</b>
                <span>{transaction.title}</span>
              </Box>
            ))}
          </Box>
        </Box>
      ))
      .concat([
        <Link to="" key="transactions-load-more">
          <Box flexRow className="load-more">
            Load More...
          </Box>
        </Link>,
      ])
  }

  render() {
    return (
      <Box flexRow className="app-container">
        <Navigation />
        <Box flexRow className="container">
          <Box flexColumn flex="1 0 50%" className="notes">
            <h3>Latest Notes</h3>
            <Box flexColumn className="column-container">
              {this.renderNotes()}
            </Box>
          </Box>
          <Box flexColumn flex="1 0 25%" className="todos">
            <h3>Todos</h3>
            <Box flexColumn className="column-container">
              {this.renderTodos()}
            </Box>
          </Box>
          <Box flexColumn flex="1 0 25%" className="transactions">
            <h3>Transactions</h3>
            <Box flexColumn className="column-container">
              {this.renderTransactions()}
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }
}

export default App
