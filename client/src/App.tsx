import type { Component } from 'solid-js'

import { ThemeProvider, createTheme } from '@suid/material/styles'

import OhmsLaw from './pages/OhmsLaw/OhmsLaw'
import Header from './components/Header'
import styles from './App.module.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const App: Component = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <div class={styles.App}>
        <Header />
        <OhmsLaw />
      </div>
    </ThemeProvider>
  )
}

export default App
