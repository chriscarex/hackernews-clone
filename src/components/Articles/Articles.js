import React from 'react'
import PropTypes from 'prop-types'
import fast from 'fast.js'
import {
  isRowContainingString
} from 'utils'
import ArticleCard from '../ArticleCard'

const Articles = ({
  articles,
  hiddenArticles,
  search,
  hide
}) => (
  <div className="articles-wrapper">
    <div
      className="articles-wrapper-title"
      data-cy="article-title"
    >
      Displaying iatest Hackernews posts
    </div>

    <div className="articles-wrapper-list">
      {
          articles
          && fast.map(articles,
            (article, index) => {
              const rowContainsFilter = isRowContainingString({
                row: article,
                searchFilter: search
              })

              return rowContainsFilter && hiddenArticles.indexOf(index) === -1 ? (
                <ArticleCard
                  article={article}
                  hide={() => hide(index)}
                  key={`counter-${index}`}
                  data-cy="article-card"
                />
            ) : null
          })
        }
    </div>
  </div>
)

Articles.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  hiddenArticles: PropTypes.arrayOf(PropTypes.number).isRequired,
  search: PropTypes.string.isRequired,
  hide: PropTypes.func.isRequired,
}

export default Articles
