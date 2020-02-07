import { isRowContainingString } from '..'

describe('isRowContainingString', () => {
  it('should return true when search filter is empty', async () => {
    const row = {
      staff: 'test1',
      user: 'test2'
    }
    const headerData = ['staff', 'user']
    const searchFilter = ''

    const output = await isRowContainingString({
      row,
      headerData,
      searchFilter
    })

    expect(output).toEqual(true)
  })

  it('should return false', async () => {
    const row = {
      staff: 'test1',
      user: 'test2'
    }
    const headerData = ['staff', 'user']
    const searchFilter = 'search'

    const output = await isRowContainingString({
      row,
      headerData,
      searchFilter
    })

    expect(output).toEqual(false)
  })

  it('should return true', async () => {
    const row = {
      staff: 'test1',
      user: 'test2'
    }
    const headerData = ['staff', 'user']
    const searchFilter = 'te'

    const output = await isRowContainingString({
      row,
      headerData,
      searchFilter
    })

    expect(output).toEqual(true)
  })
})
