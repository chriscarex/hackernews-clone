import { combineReducers } from 'redux'
import { loader } from './loader'
import { notification } from './notification'
import { sidebar } from './sidebar'
import { articles } from './articles'
import { hiddenArticles } from './hiddenArticles'
import { filters } from './filters'

const reducers = combineReducers({
  loader,
  notification,
  sidebar,
  articles,
  hiddenArticles,
  filters
})

export default reducers
