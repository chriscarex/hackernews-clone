import { isRowContainingString } from '..'

describe('isRowContainingString', () => {
  it('should return true when search filter is empty', async () => {
    const row = {
      staff: 'test1',
      user: 'test2'
    }
    const searchFilter = ''

    const output = await isRowContainingString({
      row,
      searchFilter
    })

    expect(output).toEqual(true)
  })

  it('should return true when key contains search filte', async () => {
    const row = {
      by: 'test1',
      title: 'test2'
    }
    const searchFilter = 'tes'

    const output = await isRowContainingString({
      row,
      searchFilter
    })

    expect(output).toEqual(true)
  })

  it('should return false', async () => {
    const row = {
      staff: 'test1',
      user: 'test2'
    }

    const searchFilter = 'search'

    const output = await isRowContainingString({
      row,
      searchFilter
    })

    expect(output).toEqual(false)
  })
})
