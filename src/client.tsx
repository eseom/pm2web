import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// app
import { App } from './containers/App/App'

import { createStore } from './redux/createStore'

const dest = document.getElementById('content')
const store = createStore()

const RootComponent = () => (
  <Provider store={store}>
    <App />
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
      store.replaceReducer(require('./redux/reducers').reducers);
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