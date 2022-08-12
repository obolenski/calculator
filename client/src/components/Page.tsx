import Divider from '@suid/material/Divider'
import { Component, JSX } from 'solid-js'
import PageSection from './PageSection'
import styles from './components.module.css'

interface IPageProps {
  leftSectionElements?: JSX.Element[]
  centerSectionElements?: JSX.Element[]
  rightSectionElements?: JSX.Element[]
}

const Page: Component<IPageProps> = (props) => {
  return (
    <div class={styles.page}>
      <PageSection
        components={props.leftSectionElements}
        class={styles.leftSection}
      />
      <Divider orientation="vertical" flexItem />
      <PageSection
        components={props.centerSectionElements}
        class={styles.centerSection}
      />
      <Divider orientation="vertical" flexItem />
      <PageSection
        components={props.rightSectionElements}
        class={styles.rightSection}
      />
    </div>
  )
}

export default Page
