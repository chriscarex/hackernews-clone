/* eslint import/named:0 */
import React from 'react'
import { shallow } from 'enzyme'
// import { stub } from 'sinon'
// import {
//   ADD_DATABASE,
//   DEFAULT_DATABASE
// } from 'controller/constants'
import {
 ArticlesContainer,
  // __RewireAPI__
} from '../ArticlesContainer'

// const singleActionPropStub = stub()

const setup = () => {
  const props = {
    articles: [{
      id: '1',
      title: 'test'
    }],
    // singleActionProp: singleActionPropStub
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
  })
})
