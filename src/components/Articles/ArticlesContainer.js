import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  UPDATE_HIDDEN_ARTICLES
} from 'constants/reducers'
import {
 singleAction,
} from 'store/actions'
import Articles from './Articles'

export class ArticlesContainer extends PureComponent {
  hide = id => {
    const {
      hiddenArticles,
      singleActionProp
    } = this.props

    const updatedHiddenArticles = hiddenArticles.slice()

    updatedHiddenArticles.push(id)

    singleActionProp({
      type: UPDATE_HIDDEN_ARTICLES,
      payload: { value: updatedHiddenArticles }
    })
  }


  render() {
    const {
      articles,
      hiddenArticles,
      search
    } = this.props

    return (
      <Articles
        articles={articles}
        hiddenArticles={hiddenArticles}
        hide={this.hide}
        search={search}
        data-cy="articles"
      />
    )
  }
}

ArticlesContainer.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  hiddenArticles: PropTypes.arrayOf(PropTypes.number).isRequired,
  search: PropTypes.string.isRequired,
  singleActionProp: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  articles: state.articles,
  hiddenArticles: state.hiddenArticles,
  search: state.filters.search
})

const mapDispatchToProps = (dispatch) => ({
  singleActionProp: (props) => dispatch(singleAction(props))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticlesContainer)
