import { createStore, applyMiddleware } from 'redux'
import {createClientMiddleware} from './middlewares/clientMiddleware'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { reducers } from './reducers'

const configureStore = (history, client) => {
  const reduxRouterMiddleware = routerMiddleware(history)
  const middlewares = [createClientMiddleware(client), reduxRouterMiddleware, thunk]
  const finalCreateStore = applyMiddleware(...middlewares)(createStore)
  return finalCreateStore(reducers)
}

export {
  configureStore,
}
