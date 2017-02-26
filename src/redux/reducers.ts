import { combineReducers } from 'redux'
import { reducer as info } from './modules/info'
import { routerReducer } from 'react-router-redux'

const reducers = combineReducers({
  routing: routerReducer,
  info,
})

export {
  reducers
}
