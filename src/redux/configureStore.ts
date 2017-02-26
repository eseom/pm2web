import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { reducers } from './reducers'

const configureStore = (history) => {
  const middlewares = routerMiddleware(history)
  return createStore(reducers, applyMiddleware(middlewares))
}

export {
  configureStore,
}
