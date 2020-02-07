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
      completed
    }
  }

  const component = shallow(<FullPageLoader {...props} />)

  return {
    component
  }
}

describe('FullPageLoader', () => {
  it('should show loader correctly', () => {
    const { component } = setup({
      active: 1,
      completed: 0
    })

    expect(component.exists()).toEqual(true)
    expect(component.props().active).toEqual(true)
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
