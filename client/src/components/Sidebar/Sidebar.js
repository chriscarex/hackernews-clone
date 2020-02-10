import React from 'react'
import PropTypes from 'prop-types'
import { Input, Form, Radio } from 'semantic-ui-react'

const Sidebar = ({
  isSidebarVisible,
  searchValue,
  onInput,
  order,
  onChange
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

        <div
          className="sidebar-order-wrapper"
        >
          <Form>
            <Form.Field
              className="sidebar-order-title"
            >
              Order by
            </Form.Field>
            <Form.Field>
              <Radio
                data-cy="sidebar-radio"
                label="Newest"
                name="radioGroup"
                value="newest"
                checked={order === 'newest'}
                onChange={onChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Oldest"
                name="radioGroup"
                value="oldest"
                checked={order === 'oldest'}
                onChange={onChange}
              />
            </Form.Field>
          </Form>
        </div>
      </div>
    )}
  </>
)

Sidebar.propTypes = {
  isSidebarVisible: PropTypes.bool.isRequired,
  searchValue: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  onInput: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Sidebar
