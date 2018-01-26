import React from 'react'

export const Price = props => {
  return <span className="price">{props.children}</span>
}

export const Hashtag = props => {
  return <span className="hashtag">{props.children}</span>
}

export const Mention = props => {
  return <span className="mention">{props.children}</span>
}
