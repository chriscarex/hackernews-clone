import { stub } from 'sinon'
import {
  ADD_LOADER,
  REMOVE_LOADER
} from 'constants/reducers'
import { toggleLoaderBeforeAction } from '../toggleLoaderBeforeAction'

const singleActionProp = stub()
const actionClosure = stub()

describe('toggleLoaderBeforeAction', () => {
  afterEach(() => {
    actionClosure.resetHistory()
    singleActionProp.resetHistory()
  })


  it('should call the method with the right parameters', async () => {
    await toggleLoaderBeforeAction({
      singleActionProp,
      actionClosure
    })

    expect(singleActionProp.getCall(0).args[0]).toMatchObject(
      { type: ADD_LOADER }
    )

    expect(actionClosure.called).toEqual(true)

    expect(singleActionProp.getCall(1).args[0]).toMatchObject(
      { type: REMOVE_LOADER }
    )
  })
})
