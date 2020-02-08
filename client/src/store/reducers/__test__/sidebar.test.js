import { TOGGLE_SIDEBAR } from 'constants/reducers'
import { sidebar } from '../sidebar'

describe('sidebar reducer', () => {
  it('default should work', () => {
    const input = sidebar({}, { type: 'default' })
    const output = {}
    expect(input).toMatchObject(output)
  })

  it('TOGGLE_SIDEBAR should work', () => {
    const payload = { value: false }
    const input = sidebar({ visible: false }, { type: TOGGLE_SIDEBAR, payload })
    const output = false
    expect(input.visible).toEqual(output)
  })
})
