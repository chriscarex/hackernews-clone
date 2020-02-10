import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {
  ROUTE_HOME
} from 'constants/routes'
import Sidebar from './Sidebar'

export const SidebarContainer = ({
  isSidebarVisible,
  location: {
    pathname
  }
}) => (
  <Sidebar
    data-cy="sidebar"
    isSidebarVisible={isSidebarVisible}
    pathname={pathname}
  />
)

SidebarContainer.propTypes = {
  isSidebarVisible: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
}

SidebarContainer.defaultProps = {
  location: {
    pathname: ROUTE_HOME
  }
}

const mapStateToProps = (state) => ({
  isSidebarVisible: state.sidebar.visible
})

export default withRouter(connect(
  mapStateToProps
)(SidebarContainer))
