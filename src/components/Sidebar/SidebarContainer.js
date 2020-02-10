import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {
 singleAction,
} from 'store/actions'
import {
  UPDATE_SEARCH_FILTER,
  UPDATE_HIDDEN_ARTICLES
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

  removeFromHide = id => {
    const {
      singleActionProp,
      hiddenArticles
    } = this.props

    const hiddenArticlesCopy = hiddenArticles.slice()

    const currentIndex = hiddenArticlesCopy.indexOf(id)

    hiddenArticlesCopy.splice(currentIndex, 1)

    singleActionProp({
      type: UPDATE_HIDDEN_ARTICLES,
      payload: { value: hiddenArticlesCopy }
    })
  }

  render() {
    const {
      isSidebarVisible,
      searchValue,
      hiddenArticles,
      articles
    } = this.props

    return (
      <Sidebar
        data-cy="sidebar"
        isSidebarVisible={isSidebarVisible}
        searchValue={searchValue}
        hiddenArticles={hiddenArticles}
        articles={articles}
        onInput={this.onInput}
        removeFromHide={this.removeFromHide}
      />
    )
  }
}

SidebarContainer.propTypes = {
  isSidebarVisible: PropTypes.bool.isRequired,
  hiddenArticles: PropTypes.arrayOf(PropTypes.number).isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  searchValue: PropTypes.string.isRequired,
  singleActionProp: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  isSidebarVisible: state.sidebar.visible,
  searchValue: state.filters.search,
  hiddenArticles: state.hiddenArticles,
  articles: state.articles
})


const mapDispatchToProps = (dispatch) => ({
  singleActionProp: (props) => dispatch(singleAction(props))
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContainer))
