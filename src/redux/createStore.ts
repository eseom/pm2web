import { createStore as reduxCreateStore } from 'redux'
import { reducers } from './reducers'

const createStore = () => {
  return reduxCreateStore(reducers)
}

export {
  createStore,
}