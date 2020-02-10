import { combineReducers } from 'redux'
import { loader } from './loader'
import { notification } from './notification'
import { sidebar } from './sidebar'
import { articles } from './articles'
import { article } from './article'
import { filters } from './filters'

const reducers = combineReducers({
  loader,
  notification,
  sidebar,
  articles,
  article,
  filters
})

export default reducers
