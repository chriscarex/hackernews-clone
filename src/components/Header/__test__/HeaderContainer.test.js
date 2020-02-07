/* eslint import/named:0 */
import React from 'react'
import { shallow } from 'enzyme'
import { stub } from 'sinon'
import {
  TOGGLE_SIDEBAR,
  UPDATE_ARTICLES,
  ADD_LOADER,
  REMOVE_LOADER
} from 'constants/reducers'
import { HeaderContainer, __RewireAPI__ } from '../HeaderContainer'

const toggleLoaderBeforeActionStub = stub().resolves([])
const singleActionPropStub = stub()
const pushStub = stub()

const setup = () => {
  const props = {
    isSidebarVisible: true,
    history: {
      push: pushStub
    },
    singleActionProp: singleActionPropStub
  }

  const component = shallow(<HeaderContainer {...props} />)
  const header = component.find('[data-cy~="header"]')

  return {
    header
  }
}

describe('HeaderContainer', () => {
  afterEach(() => {
    pushStub.resetHistory()
  })

  it('should pass the right props', async () => {
    const { header } = await setup()

    expect(typeof header.props().toggleSidebar).toEqual('function')
  })

  describe('componentDidMount', () => {
    beforeEach(() => {
      __RewireAPI__.__Rewire__('toggleLoaderBeforeAction', toggleLoaderBeforeActionStub)
    })

    afterEach(() => {
      __RewireAPI__.__ResetDependency__('toggleLoaderBeforeAction')
      singleActionPropStub.resetHistory()
    })

    it('should toggle loaders and update articles', async () => {
      const { header } = await setup()

      await header.props().toggleSidebar()

      expect(singleActionPropStub.called).toBe(true)

      expect(singleActionPropStub.args[0][0]).toMatchObject(
        { type: ADD_LOADER }
      )
      expect(singleActionPropStub.args[3][0]).toMatchObject(
        { type: REMOVE_LOADER }
      )
      expect(singleActionPropStub.args[4][0]).toMatchObject(
        { payload: { value: [] }, type: UPDATE_ARTICLES }
      )
    })
  })

  describe('toggleSidebar', () => {
    beforeEach(() => {
      __RewireAPI__.__Rewire__('toggleLoaderBeforeAction', toggleLoaderBeforeActionStub)
    })

    afterEach(() => {
      __RewireAPI__.__ResetDependency__('toggleLoaderBeforeAction')
      singleActionPropStub.resetHistory()
    })

    it('toggleSidebar should call the right functions', async () => {
      const { header } = await setup()

      await header.props().toggleSidebar()

      expect(singleActionPropStub.called).toBe(true)
      expect(singleActionPropStub.args[3][0]).toMatchObject(
        { payload: { value: false }, type: TOGGLE_SIDEBAR }
      )
    })
  })
})
