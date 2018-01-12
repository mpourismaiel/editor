import React from 'react'
import classNames from 'classnames'

import './box.scss'

const Box = ({
  className,
  flexColumn,
  flexRow,
  flex,
  flexFlow,
  flexGrow,
  justifyContent,
  alignItems,
  children,
  style,
  ...props
}) => (
  <div
    className={classNames(className, {
      col: flexColumn,
      row: flexRow,
    })}
    style={{
      flex,
      flexFlow,
      flexGrow,
      justifyContent,
      alignItems,
      ...(style || {}),
    }}
    {...props}>
    {children}
  </div>
)

export default Box
