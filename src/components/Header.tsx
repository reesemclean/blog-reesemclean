import React from 'react'

import { Link, StaticQuery, graphql } from 'gatsby'
import { rhythm, scale } from '../utils/typography'

export interface LayoutProps {
  location: any
}

export function Header(props) {
  const { location } = props
  const rootPath = `${__PATH_PREFIX__}/`
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => {
        const title = data.site.siteMetadata.title
        return location.pathname === rootPath ? (
          <RootHeader title={title} />
        ) : (
          <NonRootHeader title={title} />
        )
      }}
    />
  )
}

function NonRootHeader(props) {
  const { title } = props
  return (
    <h3
      style={{
        marginTop: 0,
        marginBottom: rhythm(-1),
      }}
    >
      <Link
        style={{
          boxShadow: 'none',
          textDecoration: 'none',
          color: 'inherit',
        }}
        to={'/'}
      >
        {title}
      </Link>
    </h3>
  )
}

function RootHeader(props) {
  const { title } = props
  return (
    <h1
      style={{
        ...scale(1.5),
        marginBottom: rhythm(1.5),
        marginTop: 0,
      }}
    >
      <Link
        style={{
          boxShadow: 'none',
          textDecoration: 'none',
          color: 'inherit',
        }}
        to={'/'}
      >
        {title}
      </Link>
    </h1>
  )
}
