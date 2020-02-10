import React from 'react'
import { shallow } from 'enzyme'
import Articles from '../Articles'

const setup = () => {
  const props = {
    articles: [{
      value: 'http://test.com/',
      id: 1,
      by: 'test',
      title: 'test'
    }],
    hiddenArticles: [2],
    search: 'test',
    hide: () => {}
  }

  const component = shallow(<Articles {...props} />)
  const title = component.find('[data-cy="article-title"]')
  const articles = component.find('[data-cy="article-card"]')

  return {
    component,
    title,
    articles,
    props
  }
}

describe('Articles', () => {
  it('should pass the right props', () => {
    const {
      title,
      articles,
      props
    } = setup()

    expect(title.props().children).toEqual('Displaying iatest Hackernews posts')
    expect(articles.props().article).toEqual(props.articles[0])
    expect(typeof articles.props().hide).toEqual('function')
  })
})
