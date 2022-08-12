import { Component } from 'solid-js'
import Page from '../components/Page'

const Home: Component = () => {
  const center = [<h2> hello </h2>, <p>there is a button on the top left</p>]
  return <Page centerSectionElements={center} />
}

export default Home
