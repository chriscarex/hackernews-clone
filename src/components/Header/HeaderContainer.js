import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {
  singleAction,
  toggleLoaderBeforeAction,
  sendGetRequest
} from 'store/actions'
import {
  TOGGLE_SIDEBAR,
  UPDATE_ARTICLES,
  ADD_LOADER,
  REMOVE_LOADER
} from 'constants/reducers'
import {
  BASE_ENDPOINT,
  ENDPOINT_NEWS,
  ENDPOINT_ARTICLE
} from 'constants/endpoints'
import Header from './Header'

export class HeaderContainer extends Component {
  async componentDidMount() {
    const {
      singleActionProp
    } = this.props

    singleActionProp({
      type: ADD_LOADER
    })

    const articles = []

    const endpoint = `${BASE_ENDPOINT}${ENDPOINT_NEWS}`

    const getData = () =>
      sendGetRequest({
        endpoint
      })

    const listOfIDs = await toggleLoaderBeforeAction({
      singleActionProp,
      actionClosure: getData
    })

    if (listOfIDs.length > 0) {
      for (let i = 0; i < listOfIDs.length; i++) {
        const id = listOfIDs[i]

        const endpointId = `${BASE_ENDPOINT}${ENDPOINT_ARTICLE}${id}`

        const getArticle = () =>
          sendGetRequest({
            endpoint: endpointId
          })

        const articleInfo = await toggleLoaderBeforeAction({
          singleActionProp,
          actionClosure: getArticle
        })

        if (articleInfo) {
          articles.push(articleInfo)
        }
      }
    }

    singleActionProp({
      type: REMOVE_LOADER
    })

    return singleActionProp({
      type: UPDATE_ARTICLES,
      payload: { value: articles }
    })
  }

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
