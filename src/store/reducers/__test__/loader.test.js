import {
  ADD_LOADER,
  REMOVE_LOADER,
  RESET_LOADER
} from 'constants/reducers'
import { loader } from '../loader'

describe('loader reducer', () => {
  it('default should work', () => {
    const input = loader({}, { type: 'default' })
    const output = {}
    expect(input).toMatchObject(output)
  })
  it('ADD_LOADER should work', () => {
    const input = loader({ active: 0 }, { type: ADD_LOADER })
    const output = 1
    expect(input.active).toEqual(output)
  })

  it('REMOVE_LOADER should work', () => {
    const input = loader({ completed: 0 }, { type: REMOVE_LOADER })
    const output = 1
    expect(input.completed).toEqual(output)
  })

  it('RESET_LOADER should work', () => {
    const input = loader({ active: false }, { type: RESET_LOADER })
    const output = {
      active: 0,
      completed: 0
    }
    expect(input).toEqual(output)
  })
})
