import {
  ADD_LOADER,
  REMOVE_LOADER
} from 'constants/reducers'

export const toggleLoaderBeforeAction = async ({
  singleActionProp,
  actionClosure
}) => {
  singleActionProp({
    type: ADD_LOADER
  })

  const response = await actionClosure()

  singleActionProp({
    type: REMOVE_LOADER
  })

  return response
}
