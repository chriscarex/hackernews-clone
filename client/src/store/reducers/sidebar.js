import { TOGGLE_SIDEBAR } from 'constants/reducers'

const initState = {
  visible: true
}

export const sidebar = (state = initState, action) => {
  const { type, payload } = action
  switch (type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        visible: payload.value
      }
    default:
      return state
  }
}
