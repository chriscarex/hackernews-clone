import React from 'react'
import { shallow } from 'enzyme'
import { stub } from 'sinon'
import {
  TOGGLE_SIDEBAR
} from 'constants/reducers'
import { HeaderContainer } from '../HeaderContainer'

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

  describe('toggleSidebar', () => {
    afterEach(() => {
      singleActionPropStub.resetHistory()
    })

    it('toggleSidebar should call the right functions', async () => {
      const { header } = await setup()

      await header.props().toggleSidebar()

      expect(singleActionPropStub.calledOnce).toBe(true)
      expect(singleActionPropStub.args[0][0]).toMatchObject(
        { payload: { value: false }, type: TOGGLE_SIDEBAR }
      )
    })
  })
})
