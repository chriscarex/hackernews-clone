import React from 'react'
import { shallow } from 'enzyme'
import Sidebar from '../Sidebar'

const setup = (isSidebarVisible) => {
  const props = {
    isSidebarVisible,
    searchValue: 'test',
    order: 'newest',
    onInput: () => {},
    onChange: () => {},
  }

  const component = shallow(<Sidebar {...props} />)
  const sidebar = component.find('[data-cy="sidebar"]')
  const input = component.find('[data-cy="sidebar-input"]')
  const radio = component.find('[data-cy="sidebar-radio"]')

  return {
    component,
    sidebar,
    input,
    radio
  }
}

describe('Sidebar', () => {
  it('should sidebar correctly', () => {
    const {
      sidebar,
      input,
      radio
    } = setup(true)

    expect(sidebar.props().className).toEqual('sidebar-wrapper')
    expect(input.props().value).toEqual('test')
    expect(input.props().onInput.name).toEqual('onInput')
    expect(radio.props().checked).toEqual(true)
    expect(radio.props().onChange.name).toEqual('onChange')
  })

  it('should pass the right props', () => {
    const { sidebar } = setup(false)

    expect(sidebar.exists()).toEqual(false)
  })
})
