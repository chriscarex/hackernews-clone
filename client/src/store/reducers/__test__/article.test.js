import { UPDATE_SELECTED_ARTICLE } from 'constants/reducers'
import { article } from '../article'

describe('article reducer', () => {
  it('default should work', () => {
    const input = article({}, { type: 'default' })
    const output = {
      selected: 0
    }
    expect(input).toMatchObject(output)
  })

  it('UPDATE_ARTICLES should work', () => {
    const output = { selected: 1 }
    const input = article({ selected: 0 }, { type: UPDATE_SELECTED_ARTICLE, payload: { value: output } })
    expect(input).toEqual(output)
  })
})
