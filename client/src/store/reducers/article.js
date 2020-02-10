/* eslint no-unused-vars:0 */
import { UPDATE_SELECTED_ARTICLE } from 'constants/reducers'

const initState = {
  selected: 0
}

export const article = (state = initState, action) => {
  const { type, payload } = action
  switch (type) {
    case UPDATE_SELECTED_ARTICLE:
      return payload.value
    default:
      return JSON.parse(JSON.stringify(initState))
  }
}
