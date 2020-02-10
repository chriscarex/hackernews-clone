import React from 'react'
import renderer from 'react-test-renderer'
import { ArticleCard } from '../ArticleCard'

describe('ArticleCard', () => {
  it('should render correctly', () => {
    const article = {
      by: 'author',
      score: 2,
      time: '10000000',
      title: 'Title',
      url: 'http://test.com'
    }

    const tree = renderer
    .create(<ArticleCard article={article} />)
    .toJSON()

    expect(tree).toMatchSnapshot(`
      <div
        className="article-card"
        data-cy="article-card"
      >
<a
href='http://test.com'
target="_blank"
rel="noopener nofollow noreferrer"
className="article-card"
data-cy="article-card"
>
  <Card className="article-card-container">
    <Card.Content className="article-card-title">{title}</Card.Content>
    <Card.Content extra className="article-card-meta">
      <div className="article-card-meta-item">
        <Icon name="user" /> author
      </div>

      <div className="article-card-meta-item">
        <Icon name="certificate" /> 2
      </div>

      <div className="article-card-item">
        <Icon name="clock" />
        <time
           dateTime={"1970-04-26T17:46:00.000Z"}
        >
         50 years ago
        </time>
      </div>
    </Card.Content>
    <Card.Content className="article-card-item">
    <Icon name="globe" /> http://test.com
    </Card.Content>
  </Card>
</a>
<Icon
  name="hide"
  onClick={() => hide(index)}
  className="icon-hide"
/>
</div>
`)
  })
})
