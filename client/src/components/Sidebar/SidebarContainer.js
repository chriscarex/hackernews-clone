import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {
 singleAction,
} from 'store/actions'
import {
  UPDATE_SEARCH_FILTER,
  UPDATE_ORDER_FILTER
} from 'constants/reducers'
import Sidebar from './Sidebar'

export class SidebarContainer extends PureComponent {
  onInput = e => {
    const { singleActionProp } = this.props

    singleActionProp({
      type: UPDATE_SEARCH_FILTER,
      payload: { value: e.target.value }
    })
  }

  onChange = (e, { value }) => {
    const { singleActionProp } = this.props

    singleActionProp({
      type: UPDATE_ORDER_FILTER,
      payload: { value }
    })
  }

  render() {
    const {
      isSidebarVisible,
      searchValue,
      order
    } = this.props

    return (
      <Sidebar
        data-cy="sidebar"
        isSidebarVisible={isSidebarVisible}
        searchValue={searchValue}
        order={order}
        onInput={this.onInput}
        onChange={this.onChange}
      />
    )
  }
}

SidebarContainer.propTypes = {
  isSidebarVisible: PropTypes.bool.isRequired,
  searchValue: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  singleActionProp: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  isSidebarVisible: state.sidebar.visible,
  searchValue: state.filters.search,
  order: state.filters.order,
})

const mapDispatchToProps = (dispatch) => ({
  singleActionProp: (props) => dispatch(singleAction(props))
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContainer))
