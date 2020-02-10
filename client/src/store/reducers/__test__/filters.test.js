import {
 UPDATE_SEARCH_FILTER,
 UPDATE_ORDER_FILTER
} from 'constants/reducers'
import { filters } from '../filters'

describe('filters reducer', () => {
  it('default should work', () => {
    const input = filters({}, { type: 'default' })
    const output = {
      search: '',
      order: 'newest'
    }
    expect(input).toMatchObject(output)
  })

  it('UPDATE_SEARCH_FILTER should work', () => {
    const payload = { value: 'test' }
    const input = filters({ search: '' }, { type: UPDATE_SEARCH_FILTER, payload })
    const output = 'test'
    expect(input.search).toEqual(output)
  })

  it('UPDATE_ORDER_FILTER should work', () => {
    const payload = { value: 'newest' }
    const input = filters({ order: 'older' }, { type: UPDATE_ORDER_FILTER, payload })
    const output = 'newest'
    expect(input.order).toEqual(output)
  })
})
