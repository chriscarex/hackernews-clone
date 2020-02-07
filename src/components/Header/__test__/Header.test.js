import React from 'react'
import { shallow } from 'enzyme'
import { ROUTE_HOME } from 'constants/routes'
import { Header } from '../Header'

const setup = () => {
  const props = {
    toggleSidebar: () => false
  }

  const component = shallow(<Header {...props} />)
  const logoLink = component.find('[data-cy="logo-link"]').props()
  const logo = component.find('[data-cy="logo"]').props()
  const sidebar = component.find('[data-cy="sidebar-icon"]').props()

  return {
    component,
    logo,
    logoLink,
    sidebar
  }
}

describe('Header', () => {
  it('should render correctly', () => {
    const { component } = setup()

    expect(component.exists()).toEqual(true)
  })

  it('should pass the right props', () => {
    const { logoLink, sidebar } = setup()

    expect(logoLink.to).toEqual(ROUTE_HOME)
    expect(sidebar.onClick.name).toEqual('toggleSidebar')
  })
})
