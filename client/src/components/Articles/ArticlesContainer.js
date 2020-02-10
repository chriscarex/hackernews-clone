import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
 singleAction,
} from 'store/actions'
import Articles from './Articles'

export class ArticlesContainer extends PureComponent {
  // componentDidUpdate(prevProps) {
  //   const {
  //     articles,
  //     search
  //   } = this.props
  //
  //   if (articles !== prevProps.articles
  //     && search !== prevProps.search
  //   ) {
  //     this.getArticlesToDisplay()
  //   }
  // }
  //
  // getArticlesToDisplay = async () => {
  //   const {
  //     articles,
  //     search,
  //     singleActionProp
  //   } = this.props
  //
  //   let articlesToDisplay = []
  //
  //   console.log({
  //     articles,
  //     search
  //   })
  //   if (search === '') {
  //     articlesToDisplay = articles
  //   } else {
  //     for (let i = 0; i < articles.length; i++) {
  //       const row = articles[i]
  //       const rowContainsFilter = await isRowContainingString({
  //         row,
  //         searchFilter: search
  //       })
  //
  //       if (rowContainsFilter) {
  //         articlesToDisplay.push(row)
  //       }
  //     }
  //   }
  //
  //   singleActionProp({
  //     type: UPDATE_FILTERED_ARTICLES,
  //     payload: { value: articlesToDisplay }
  //   })
  // }

  render() {
    const {
      articles,
      search
    } = this.props

    return (
      <Articles
        articles={articles}
        search={search}
        data-cy="articles"
      />
    )
  }
}

ArticlesContainer.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  search: PropTypes.string.isRequired,
  // singleActionProp: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  articles: state.articles,
  search: state.filters.search
})

const mapDispatchToProps = (dispatch) => ({
  singleActionProp: (props) => dispatch(singleAction(props))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticlesContainer)
