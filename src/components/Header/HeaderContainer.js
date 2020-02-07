import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {
  singleAction
} from 'store/actions'
import {
  TOGGLE_SIDEBAR
} from 'constants/reducers'
import Header from './Header'

export class HeaderContainer extends Component {
  toggleSidebar = () => {
    const { singleActionProp, isSidebarVisible } = this.props

    singleActionProp({
      type: TOGGLE_SIDEBAR,
      payload: { value: !isSidebarVisible }
    })
  }

  render() {
    return (
      <Header
        data-cy="header"
        toggleSidebar={this.toggleSidebar}
      />
    )
  }
}

HeaderContainer.propTypes = {
  isSidebarVisible: PropTypes.bool.isRequired,
  singleActionProp: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
}

HeaderContainer.defaultProps = {
  location: {
    pathname: '/'
  }
}

const mapStateToProps = (state) => ({
  isSidebarVisible: state.sidebar.visible
})

const mapDispatchToProps = (dispatch) => ({
  singleActionProp: (props) => dispatch(singleAction(props))
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderContainer))
