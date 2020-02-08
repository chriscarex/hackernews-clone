import React from 'react'
import { shallow } from 'enzyme'

import { Notification } from '../Notification'

const setup = isNotificationActive => {
  const props = {
    isNotificationActive,
    notification: 'test'
  }

  const component = shallow(<Notification {...props} />)
  const notification = component.find("[data-cy='notification']")

  return {
    component,
    notification
  }
}

describe('Notification', () => {
  it('should render correctly', () => {
    const {
      component,
      notification
    } = setup(true)

    expect(component.exists()).toEqual(true)
    expect(notification.props().children).toEqual('test')
  })

  it('should not render correctly', () => {
    const { notification } = setup(false)

    expect(notification.exists()).toEqual(false)
  })
})
