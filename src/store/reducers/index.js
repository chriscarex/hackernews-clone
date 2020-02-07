import { combineReducers } from 'redux'
import { loader } from './loader'
import { notification } from './notification'
import { sidebar } from './sidebar'

const reducers = combineReducers({
  loader,
  notification,
  sidebar,
})

export default reducers
