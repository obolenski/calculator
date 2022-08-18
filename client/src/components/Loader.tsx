import { Component } from 'solid-js'
import LinearProgress from '@suid/material/LinearProgress'
import Fade from '@suid/material/Fade'

interface LoaderProps {
  in: boolean
}

const Loader: Component<LoaderProps> = (props) => {
  return (
    <Fade in={props.in} timeout={200}>
      <LinearProgress
        sx={{
          position: 'absolute',
          top: '60px',
          left: 0,
          right: 0,
        }}
      />
    </Fade>
  )
}

export default Loader
