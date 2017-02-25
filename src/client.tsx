import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import { App } from './containers/App/App'

import { configureStore } from './redux/configureStore'
import { getRoutes } from './routes'

const dest = document.getElementById('content')
const store = configureStore()

const RootComponent = () => (
  <Provider store={store}>
    <Router routes={getRoutes(store)} history={browserHistory} />
  </Provider>
)

ReactDOM.render(
  <RootComponent />,
  dest,
)

if (process.env.NODE_ENV !== 'production') {
  if ((module as any).hot) {
    (module as any).hot.accept('./redux/reducers', () => {
      /* tslint:disable */
      store.replaceReducer(require('./redux/reducers').reducers)
      /* tslint:enable */
    });
    (module as any).hot.accept(() => {
      ReactDOM.render(
        <RootComponent />,
        dest,
      )
    })
  }
}
