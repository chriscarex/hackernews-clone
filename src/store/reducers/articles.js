/* eslint no-unused-vars:0 */
import { UPDATE_ARTICLES } from 'constants/reducers'

const initState = []

export const articles = (state = initState, action) => {
  const { type, payload } = action
  switch (type) {
    case UPDATE_ARTICLES:
      return payload.value
    default:
      return JSON.parse(JSON.stringify(initState))
  }
}
