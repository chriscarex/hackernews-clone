/* eslint no-unused-vars:0 */
import { UPDATE_HIDDEN_ARTICLES } from 'constants/reducers'

const initState = []

export const hiddenArticles = (state = initState, action) => {
  const { type, payload } = action
  switch (type) {
    case UPDATE_HIDDEN_ARTICLES:
      return payload.value
    default:
      return state
  }
}
