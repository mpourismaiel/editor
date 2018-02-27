import React from 'react'
import { Link } from 'react-router-dom'

import Box from 'component/common/box'
import './styles.scss'

const Navigation = () => (
  <Box flexColumn flex="1 0 auto" className="navigation">
    <Link to="/" className="logo">
      The Journal
    </Link>
    <Link to="/journal">Journal</Link>
    <Link to="/notes">Notes</Link>
  </Box>
)

export default Navigation
