import React from 'react'
import { shallow } from 'enzyme'

import { FullPageLoader } from '../FullPageLoader'

const setup = ({
  active,
  completed
}) => {
  const props = {
    loader: {
      active,
      completed,
      loadedArticles: 20,
      totalArticles: 500
    }
  }

  const component = shallow(<FullPageLoader {...props} />)
  const message = component.find("[data-cy='message']")

  return {
    component,
    message
  }
}

describe('FullPageLoader', () => {
  it('should show loader correctly', () => {
    const {
 component,
    message
} = setup({
      active: 1,
      completed: 0
    })

    expect(component.exists()).toEqual(true)
    expect(component.props().active).toEqual(true)
    expect(message.props().children.join('')).toEqual('Loading 20 of 500 articles')
  })

  it('should not show loader', () => {
    const { component } = setup({
      active: 1,
      completed: 1
    })

    expect(component.exists()).toEqual(true)
    expect(component.props().active).toEqual(false)
  })
})
