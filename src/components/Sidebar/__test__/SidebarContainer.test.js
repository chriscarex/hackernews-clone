import React from 'react'
import { shallow } from 'enzyme'
import { stub } from 'sinon'
import {
  UPDATE_SEARCH_FILTER,
  UPDATE_HIDDEN_ARTICLES
} from 'constants/reducers'
import { SidebarContainer } from '../SidebarContainer'

const singleActionPropStub = stub()


const setup = () => {
  const props = {
    isSidebarVisible: true,
    searchValue: 'test',
    onInput: () => {},
    hiddenArticles: [2],
    articles: [{
      id: 1
    }],
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
    expect(sidebar.props().hiddenArticles).toEqual([2])
    expect(sidebar.props().articles).toEqual([{
      id: 1
    }])
    expect(typeof sidebar.props().onInput).toEqual('function')
    expect(typeof sidebar.props().removeFromHide).toEqual('function')
  })

  describe('onInput', () => {
    afterEach(() => {
      singleActionPropStub.resetHistory()
    })

    it('onInput should call the right functions', async () => {
      const { sidebar } = await setup()

      await sidebar.props().onInput({ target: { value: 'test' } })

      expect(singleActionPropStub.called).toBe(true)
      expect(singleActionPropStub.args[0][0]).toMatchObject(
        { payload: { value: 'test' }, type: UPDATE_SEARCH_FILTER }
      )
    })
  })

  describe('removeFromHide', () => {
    afterEach(() => {
      singleActionPropStub.resetHistory()
    })

    it('removeFromHide should call the right functions', async () => {
      const { sidebar } = await setup()

      await sidebar.props().removeFromHide(2)

      expect(singleActionPropStub.called).toBe(true)
      expect(singleActionPropStub.args[0][0]).toMatchObject(
        { payload: { value: [] }, type: UPDATE_HIDDEN_ARTICLES }
      )
    })
  })
})
