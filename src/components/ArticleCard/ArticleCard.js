import React from 'react'
import PropTypes from 'prop-types'
import { Card, Icon } from 'semantic-ui-react'
import Moment from 'react-moment'
import moment from 'moment'

export const ArticleCard = ({
  index,
  article: {
    by,
    score,
    time,
    title,
    url
  },
  hide
}) => (
  <div
    className="article-card"
    data-cy="article-card"
  >
    <a
      href={url}
      target="_blank"
      rel="noopener nofollow noreferrer"
    >
      <Card className="article-card-container">
        <Card.Content className="article-card-title">{title}</Card.Content>
        <Card.Content extra className="article-card-meta">
          <div className="article-card-meta-item">
            <Icon name="user" /> {by}
          </div>

          <div className="article-card-meta-item">
            <Icon name="certificate" /> {score}
          </div>

          <div className="article-card-item">
            <Icon name="clock" /> <Moment fromNow>{moment.unix(time).format('YYYY-MM-DD HH:mm')}</Moment>
          </div>
        </Card.Content>
        {url
          && (
          <Card.Content className="article-card-item">
            <Icon name="globe" /> {url && url.length > 80 ? `${url.substring(0, 80)}...` : url}
          </Card.Content>
        )}
      </Card>

    </a>

    <Icon
      name="hide"
      onClick={() => hide(index)}
      className="icon-hide"
    />
  </div>
)

ArticleCard.propTypes = {
  index: PropTypes.number.isRequired,
  article: PropTypes.shape({
    id: PropTypes.number,
    score: PropTypes.number,
    by: PropTypes.string,
    time: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  hide: PropTypes.func.isRequired
}

export default ArticleCard
