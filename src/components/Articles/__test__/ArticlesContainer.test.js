/* eslint import/named:0 */
import React from 'react'
import { shallow } from 'enzyme'
import { stub } from 'sinon'
import {
  UPDATE_HIDDEN_ARTICLES
} from 'constants/reducers'
import {
 ArticlesContainer,
} from '../ArticlesContainer'

const singleActionPropStub = stub()

const setup = () => {
  const props = {
    articles: [{
      id: 1,
      title: 'test'
    }],
    hiddenArticles: [2],
    search: '',

    singleActionProp: singleActionPropStub
  }

  const component = shallow(<ArticlesContainer {...props} />)
  const articles = component.find('[data-cy="articles"]').props()

  return {
    component,
    articles,
    props
  }
}


describe('ArticlesContainer', () => {
  it('should render correctly', () => {
    const { component } = setup()

    expect(component.exists()).toEqual(true)
  })

  it('should pass the right props', () => {
    const {
      articles,
      props
    } = setup()

    expect(articles.articles).toEqual(props.articles)
    expect(articles.hiddenArticles).toEqual(props.hiddenArticles)
    expect(articles.search).toEqual(props.search)
  })

  describe('hide', () => {
    afterEach(() => {
      singleActionPropStub.resetHistory()
    })

    it('hide should call the right functions', async () => {
      const { articles } = await setup()

      await articles.hide(1)

      expect(singleActionPropStub.called).toBe(true)
      expect(singleActionPropStub.args[0][0]).toMatchObject(
        { payload: { value: [2, 1] }, type: UPDATE_HIDDEN_ARTICLES }
      )
    })
  })
})
