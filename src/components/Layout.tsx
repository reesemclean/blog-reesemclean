import React from 'react'

import { rhythm } from '../utils/typography'

import { Header } from './Header'

export interface LayoutProps {
  location: any
  children: any
}

function Layout(props: LayoutProps) {
  const { location, children } = props

  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <Header location={location} />
      {children}
    </div>
  )
}

export default Layout
