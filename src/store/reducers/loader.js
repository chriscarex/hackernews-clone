import {
  // TOGGLE_LOADER,
  ADD_LOADER,
  ADD_ARTICLE,
  REMOVE_LOADER,
  RESET_LOADER
 } from 'constants/reducers'

const initState = {
  active: 0,
  completed: 0,
  loadedArticles: 0,
  totalArticles: 100
}

export const loader = (state = initState, action) => {
  const {
    type
   } = action
  switch (type) {
    case ADD_LOADER:
      return {
        ...state,
        active: state.active + 1
      }
    case REMOVE_LOADER:
      return {
        ...state,
        completed: state.completed + 1
      }
    case ADD_ARTICLE:
      return {
        ...state,
        loadedArticles: state.loadedArticles + 1
      }
    case RESET_LOADER:
      return JSON.parse(JSON.stringify(initState))
    default: return state
  }
}
