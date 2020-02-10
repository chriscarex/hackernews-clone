import { combineReducers } from 'redux'
import { loader } from './loader'
import { notification } from './notification'
import { sidebar } from './sidebar'
import { articles } from './articles'
import { filters } from './filters'

const reducers = combineReducers({
  loader,
  notification,
  sidebar,
  articles,
  filters
})

export default reducers
