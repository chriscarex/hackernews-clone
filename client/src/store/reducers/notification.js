import {
  SHOW_NOTIFICATION,
  RESET_NOTIFICATION
} from 'constants/reducers'

const initState = {
  active: false,
  message: ''
}

export const notification = (state = initState, action) => {
  const { type, payload } = action
  switch (type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        active: true,
        message: payload.value
      }
    case RESET_NOTIFICATION:
      return initState
    default: return state
  }
}
