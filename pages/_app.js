import App, { Container } from 'next/app'
import React from 'react'
import TagManager from 'react-gtm-module'
import '../styles/globals.css'

const tagManagerArgs = {
  gtmId: 'GTM-5LQK5MF'
}

class MyApp extends App {
  componentDidMount() {
    TagManager.initialize(tagManagerArgs)
  }


  render() {
    const { Component, pageProps } = this.props
    return (
      <Component {...pageProps} />
    )
  }
}

export default MyApp