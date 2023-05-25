import App, { Container } from 'next/app'
import React from 'react'
import Head from 'next/head'
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
      <>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <Component {...pageProps} />
      </>
    )
  }
}

export default MyApp