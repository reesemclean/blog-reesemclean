import React from 'react'
import Layout from '../components/Layout'

export interface NotFoundPageProps {
  location: any
}

function NotFoundPage(props: NotFoundPageProps) {
  const { location } = props
  return (
    <Layout location={location}>
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist...</p>
    </Layout>
  )
}

export default NotFoundPage
