import {
  SHOW_NOTIFICATION,
  RESET_NOTIFICATION
} from 'constants/reducers'
import { notification } from '../notification'

describe('NOTIFICATION reducer', () => {
  it('default should work', () => {
    const input = notification({}, { type: 'default' })
    const output = {}
    expect(input).toMatchObject(output)
  })

  it('SHOW_NOTIFICATION should work', () => {
    const payload = {
      value: 'test'
    }

    const input = notification({
      active: false,
      message: ''
    }, { type: SHOW_NOTIFICATION, payload })

    expect(input).toEqual({
      message: payload.value,
      active: true
    })
  })

  it('RESET_NOTIFICATION should work', () => {
    const initState = {
      active: false,
      message: ''
    }

    const input = notification({
      active: true,
      message: 'test'
    }, { type: RESET_NOTIFICATION })

    expect(input).toEqual(initState)
  })
})
