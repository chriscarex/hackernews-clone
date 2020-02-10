import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'

const Sidebar = ({
  isSidebarVisible,
  searchValue,
  onInput
}) => (
  <>
    {isSidebarVisible
      && (
      <div
        className="sidebar-wrapper"
        data-cy="sidebar"
      >

        <div
          className="sidebar-input-wrapper"
        >
          <Input
            data-cy="sidebar-input"
            value={searchValue}
            icon="search"
            placeholder="Search..."
            onInput={onInput}
          />
        </div>
      </div>
    )}
  </>
)

Sidebar.propTypes = {
  isSidebarVisible: PropTypes.bool.isRequired,
  searchValue: PropTypes.string.isRequired,
  onInput: PropTypes.func.isRequired,
}

export default Sidebar
