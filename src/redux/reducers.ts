import { combineReducers } from 'redux';
import { reducer as info } from './modules/info'

const reducers = combineReducers({
  info,
})

export {
  reducers
}