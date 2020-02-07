import React from 'react'
import PropTypes from 'prop-types'

const Sidebar = ({
  isSidebarVisible
}) => (
  <>
    {isSidebarVisible
      && (
      <div
        className="sidebar-wrapper"
        data-cy="sidebar"
      >
        TEST
      </div>
)}
  </>
)

Sidebar.propTypes = {
  isSidebarVisible: PropTypes.bool.isRequired
}

export default Sidebar
