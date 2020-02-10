import React from 'react'
import { shallow } from 'enzyme'
import Sidebar from '../Sidebar'

const setup = (isSidebarVisible) => {
  const props = {
    isSidebarVisible,
    searchValue: 'test',
    onInput: () => {},
    hiddenArticles: [0],
    articles: [{
      id: 1,
      title: 'test'
    }],
    removeFromHide: () => {},
  }

  const component = shallow(<Sidebar {...props} />)
  const sidebar = component.find('[data-cy="sidebar"]')
  const input = component.find('[data-cy="sidebar-input"]')
  const hiddenArticleIcon = component.find('[data-cy="hidden-article-icon"]')

  return {
    component,
    sidebar,
    input,
    hiddenArticleIcon
  }
}

describe('Sidebar', () => {
  it('should sidebar correctly', async () => {
    const {
      sidebar,
      input,
      hiddenArticleIcon
    } = await setup(true)

    expect(sidebar.props().className).toEqual('sidebar-wrapper')
    expect(input.props().value).toEqual('test')
    expect(input.props().onInput.name).toEqual('onInput')
    expect(typeof hiddenArticleIcon.props().onClick).toEqual('function')
  })

  it('should pass the right props', () => {
    const { sidebar } = setup(false)

    expect(sidebar.exists()).toEqual(false)
  })
})
