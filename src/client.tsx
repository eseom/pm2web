// react
import * as React from 'react'
import { Component } from 'react'
import * as ReactDOM from 'react-dom'

// app
import { App } from './containers/App/App'

const dest = document.getElementById('content')

ReactDOM.render(
  <App />,
  dest,
)

if (process.env.NODE_ENV !== 'production') {
  if ((module as any).hot) {
    (module as any).hot.accept(() => {
      ReactDOM.render(
        <App />,
        dest,
      )
    })
  }
}