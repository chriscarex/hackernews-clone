import React from 'react'
import { shallow } from 'enzyme'
import { SidebarContainer } from '../SidebarContainer'

const setup = () => {
  const props = {
    isSidebarVisible: true,
    location: { pathname: '/' },
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
    expect(sidebar.props().pathname).toEqual('/')
  })
})
