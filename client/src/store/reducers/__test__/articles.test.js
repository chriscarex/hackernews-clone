import { UPDATE_ARTICLES } from 'constants/reducers'
import { articles } from '../articles'

describe('articles reducer', () => {
  it('default should work', () => {
    const input = articles({}, { type: 'default' })
    const output = {}
    expect(input).toMatchObject(output)
  })

  it('UPDATE_ARTICLES should work', () => {
    const output = [{ id: 1 }]
    const input = articles([], { type: UPDATE_ARTICLES, payload: { value: output } })
    expect(input).toEqual(output)
  })
})
