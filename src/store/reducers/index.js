import { combineReducers } from 'redux'
import { loader } from './loader'
import { notification } from './notification'
import { sidebar } from './sidebar'
import { articles } from './articles'

const reducers = combineReducers({
  loader,
  notification,
  sidebar,
  articles,
})

export default reducers
