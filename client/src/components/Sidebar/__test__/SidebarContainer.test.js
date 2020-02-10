import React from 'react'
import { shallow } from 'enzyme'
import { stub } from 'sinon'
import {
  UPDATE_SEARCH_FILTER,
  UPDATE_ORDER_FILTER
} from 'constants/reducers'
import { SidebarContainer } from '../SidebarContainer'

const singleActionPropStub = stub()


const setup = () => {
  const props = {
    isSidebarVisible: true,
    searchValue: 'test',
    onInput: () => {},
    singleActionProp: singleActionPropStub
  }

  const component = shallow(<SidebarContainer {...props} />)
  const sidebar = component.find('[data-cy="sidebar"]')

  return {
    component,
    sidebar,
  }
}

describe('SidebarContainer', () => {
  it('should render correctly', () => {
    const { sidebar } = setup(true)

    expect(sidebar.props().isSidebarVisible).toEqual(true)
    expect(sidebar.props().searchValue).toEqual('test')
    expect(typeof sidebar.props().onInput).toEqual('function')
  })

  describe('onInput', () => {
    afterEach(() => {
      singleActionPropStub.resetHistory()
    })

    it('toggleSidebar should call the right functions', async () => {
      const { sidebar } = await setup()

      await sidebar.props().onInput({ target: { value: 'test' } })

      expect(singleActionPropStub.called).toBe(true)
      expect(singleActionPropStub.args[0][0]).toMatchObject(
        { payload: { value: 'test' }, type: UPDATE_SEARCH_FILTER }
      )
    })
  })
})
