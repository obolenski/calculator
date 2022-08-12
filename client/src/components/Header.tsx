import { Component, createSignal, For, Show } from 'solid-js'

import BoltIcon from '@suid/icons-material/Bolt'
import AppBar from '@suid/material/AppBar'
import Toolbar from '@suid/material/Toolbar'

import styles from '../App.module.css'
import { NavLink, useLocation } from '@solidjs/router'
import IconButton from '@suid/material/IconButton'
import MenuIcon from '@suid/icons-material/Menu'
import Button from '@suid/material/Button'
import Drawer from '@suid/material/Drawer'
import List from '@suid/material/List'
import ListItem from '@suid/material/ListItem'
import ListItemButton from '@suid/material/ListItemButton'
import ListItemText from '@suid/material/ListItemText'
import routes from '../routes/routes'

const Header: Component = () => {
  const [state, setState] = createSignal({ open: false })

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' ||
          (event as KeyboardEvent).key === 'Shift')
      ) {
        return
      }
      setState({ open: open })
    }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            edge="start"
            sx={{ position: 'absolute', left: 30 }}
          >
            <MenuIcon />
          </IconButton>
          <Button href="/" aria-label="home">
            <BoltIcon className={styles.logo} />
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={state().open}
        onClose={toggleDrawer(false)}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <For each={routes}>
          {(route) => (
            <Show when={!route.excludeFromNav}>
              <List>
                <ListItem
                  disablePadding
                  component={NavLink}
                  href={route.path}
                  onclick={toggleDrawer(false)}
                >
                  <ListItemButton
                    selected={Boolean(useLocation().pathname == route.path)}
                  >
                    <ListItemText primary={route.linkText} secondary={''} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Show>
          )}
        </For>
      </Drawer>
    </>
  )
}

export default Header
