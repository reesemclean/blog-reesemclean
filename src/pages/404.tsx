import React from 'react'
import Layout from '../components/Layout'

export interface NotFoundPageProps {
  location: any
}

class NotFoundPage extends React.Component<NotFoundPageProps, {}> {
  render() {
    return (
      <Layout location={this.props.location}>
        <h1>Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Layout>
    )
  }
}

export default NotFoundPage
