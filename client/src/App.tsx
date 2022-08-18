import { Component, Suspense, Show } from 'solid-js'
import { useIsRouting, useRoutes } from '@solidjs/router'

import Header from './components/Header'

import { ThemeProvider, createTheme } from '@suid/material/styles'
import CssBaseline from '@suid/material/CssBaseline'
import Box from '@suid/material/Box'
import useMediaQuery from '@suid/material/useMediaQuery'

import routes from './routes/routes'
import Loader from './components/Loader'

const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

const darkTheme = createTheme({
  palette: {
    // mode: prefersDarkMode() ? 'dark' : 'light',
    mode: 'dark',
  },
})

const App: Component = () => {
  const Routes = useRoutes(routes)
  const isRouting = useIsRouting()
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box>
        <Header />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader in={isRouting()} />
          <Suspense fallback={<Loader in={true} />}>
            <Routes />
          </Suspense>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
