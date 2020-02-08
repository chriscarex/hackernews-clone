import React from 'react'
import logo from 'assets/img/logo.png'
import { Icon } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ROUTE_HOME } from 'constants/routes'

export const Header = ({ toggleSidebar }) => (
  <header className="header">
    <Link
      to={ROUTE_HOME}
      data-cy="logo-link"
    >
      <img
        src={logo}
        alt="Hackernews News"
        className="logo"
        data-cy="logo"
      />
    </Link>

    <Icon
      onClick={toggleSidebar}
      data-cy="sidebar-icon"
      className="header-icon sidebar"
    />
  </header>
)

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired
}

export default withRouter(Header)
