import { Component, Suspense } from 'solid-js'
import { useRoutes } from '@solidjs/router'

import Header from './components/Header'

import { ThemeProvider, createTheme } from '@suid/material/styles'
import CssBaseline from '@suid/material/CssBaseline'
import Box from '@suid/material/Box'
import useMediaQuery from '@suid/material/useMediaQuery'
import LinearProgress from '@suid/material/LinearProgress'

import routes from './routes/routes'

const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

const darkTheme = createTheme({
  palette: {
    // mode: prefersDarkMode() ? 'dark' : 'light',
    mode: 'dark',
  },
})

const App: Component = () => {
  const Routes = useRoutes(routes)
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
          <Suspense fallback={<LinearProgress />}>
            <Routes />
          </Suspense>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
