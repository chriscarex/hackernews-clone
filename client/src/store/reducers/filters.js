/* eslint no-unused-vars:0 */
import {
 UPDATE_SEARCH_FILTER,
 UPDATE_ORDER_FILTER
} from 'constants/reducers'

const initState = {
  search: '',
  order: 'newest' // 'oldest'
}

export const filters = (state = initState, action) => {
  const { type, payload } = action
  switch (type) {
    case UPDATE_SEARCH_FILTER:
      return {
        ...state,
        search: payload.value
      }
    case UPDATE_ORDER_FILTER:
      return {
        ...state,
        order: payload.value
      }
    default:
      return JSON.parse(JSON.stringify(initState))
  }
}
