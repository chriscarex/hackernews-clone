import React from 'react'
import { shallow } from 'enzyme'
import Sidebar from '../Sidebar'

const setup = (isSidebarVisible) => {
  const props = {
    isSidebarVisible,
  }

  const component = shallow(<Sidebar {...props} />)
  const sidebar = component.find('[data-cy="sidebar"]')

  return {
    component,
    sidebar,
  }
}

describe('Sidebar', () => {
  it('should sidebar correctly', () => {
    const { sidebar } = setup(true)

    expect(sidebar.props().className).toEqual('sidebar-wrapper')
  })

  it('should pass the right props', () => {
    const { sidebar } = setup(false)

    expect(sidebar.exists()).toEqual(false)
  })
})
