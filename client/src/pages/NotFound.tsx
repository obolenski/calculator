import { Component } from 'solid-js'
import Page from '../components/Page'
import verySadEmoji from '../assets/verySadEmoji.png'

const NotFound: Component = () => {
  const currentPath = window.location.href
  const centerElements = [
    <h1>404</h1>,
    <p>
      Page <i>{currentPath}</i> not found
    </p>,
    <p>Check the URL</p>,
  ]
  const leftElements = [<img src={verySadEmoji} width="100" />]
  const rightElements = [<img src={verySadEmoji} width="100" />]
  return (
    <Page
      leftSectionElements={leftElements}
      centerSectionElements={centerElements}
      rightSectionElements={rightElements}
    />
  )
}

export default NotFound
