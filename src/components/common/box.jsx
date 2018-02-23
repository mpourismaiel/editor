import React from 'react'
import classNames from 'classnames'

import './box.scss'

const Box = ({
  shouldRender,
  className,
  flexColumn,
  flexRow,
  flex,
  flexFlow,
  flexGrow,
  justifyContent,
  alignItems,
  alignSelf,
  children,
  style,
  ...props
}) => {
  if (shouldRender === false) {
    return null
  }

  return (
    <div
      className={classNames(className, { col: flexColumn, row: flexRow })}
      style={{
        flex,
        flexFlow,
        flexGrow,
        justifyContent,
        alignItems,
        alignSelf,
        ...(style || {}),
      }}
      {...props}>
      {children}
    </div>
  )
}

export default Box
