import { Component } from 'solid-js'

import BoltIcon from '@suid/icons-material/Bolt'

import styles from '../App.module.css'

const Header: Component = () => {
  return (
    <div class={styles.header}>
      <BoltIcon />
    </div>
  )
}

export default Header
