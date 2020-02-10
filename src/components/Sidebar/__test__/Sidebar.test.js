import React from 'react'
import { shallow } from 'enzyme'
import Sidebar from '../Sidebar'

const setup = (isSidebarVisible) => {
  const props = {
    isSidebarVisible,
    searchValue: 'test',
    onInput: () => {},
  }

  const component = shallow(<Sidebar {...props} />)
  const sidebar = component.find('[data-cy="sidebar"]')
  const input = component.find('[data-cy="sidebar-input"]')

  return {
    component,
    sidebar,
    input,
  }
}

describe('Sidebar', () => {
  it('should sidebar correctly', () => {
    const {
      sidebar,
      input
    } = setup(true)

    expect(sidebar.props().className).toEqual('sidebar-wrapper')
    expect(input.props().value).toEqual('test')
    expect(input.props().onInput.name).toEqual('onInput')
  })

  it('should pass the right props', () => {
    const { sidebar } = setup(false)

    expect(sidebar.exists()).toEqual(false)
  })
})
