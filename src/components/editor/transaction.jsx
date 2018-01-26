import React from 'react'
import classNames from 'classnames'

class Transaction extends React.Component {
  render() {
    const { block } = this.props
    const text = block.getText() || ''

    const className = classNames('transaction', {
      income: text[0] === '+',
      expense: text[1] === '-',
    })

    const price = text.match(/^(\-|\+)\d+[a-zA-z]*/)
    if (!price || price.length === 0) {
      return null
    }

    return <div className={className}>{text}</div>
  }
}

export const Price = props => {
  return <span className="price">{props.children}</span>
}
export default Transaction
