import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import {
//  singleAction,
// } from 'store/actions'
import Articles from './Articles'

export class ArticlesContainer extends PureComponent {
  render() {
    const {
      articles
    } = this.props

    return (
      <Articles
        articles={articles}
        data-cy="articles"
      />
    )
  }
}

ArticlesContainer.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

const mapStateToProps = (state) => ({
  articles: state.articles
})

// const mapDispatchToProps = (dispatch) => ({
//   singleActionProp: (props) => dispatch(singleAction(props))
// })

export default connect(
  mapStateToProps,
  // mapDispatchToProps,
)(ArticlesContainer)
