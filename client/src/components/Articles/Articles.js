import React from 'react'
import PropTypes from 'prop-types'
import fast from 'fast.js'
import ArticleCard from '../ArticleCard'

const Articles = ({
  articles
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
            (article, index) => (
              <ArticleCard
                article={article}
                index={index}
                key={`counter-${index}`}
                data-cy="article-card"
              />
            ))
        }
    </div>
  </div>
)

Articles.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired
}

export default Articles
