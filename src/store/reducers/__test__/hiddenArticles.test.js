import { UPDATE_HIDDEN_ARTICLES } from 'constants/reducers'
import { hiddenArticles } from '../hiddenArticles'

describe('hiddenArticles reducer', () => {
  it('default should work', () => {
    const input = hiddenArticles({}, { type: 'default' })
    const output = {}
    expect(input).toMatchObject(output)
  })

  it('UPDATE_HIDDEN_ARTICLES should work', () => {
    const output = ['1']
    const input = hiddenArticles([], { type: UPDATE_HIDDEN_ARTICLES, payload: { value: output } })
    expect(input).toEqual(output)
  })
})
