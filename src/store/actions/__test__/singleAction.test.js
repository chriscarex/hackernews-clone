import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { singleAction } from '..'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('singleAction', () => {
  it('should return the correct action type', async () => {
    const store = mockStore()
    await store.dispatch(singleAction({ type: 'TYPE' }))
    const actions = store.getActions()

    expect(actions[0].type).toEqual('TYPE')
  })
})
