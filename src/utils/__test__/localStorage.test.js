import {
  readLS, upsertLS, deleteLS, isLSEmpty, removeAllLSs
} from '..'

const key = 'test'
const value = 'abc'

describe('localStorage', () => {
  describe('deleteLS', () => {
    it('Should delete cookie', () => {
      upsertLS(key, value)
      deleteLS(key)

      expect(localStorage.getItem(key)).toEqual(null)
    })
  })

  describe('upsert and readLS', () => {
    it('Should read cookie', async () => {
      await upsertLS(key, value)
      const cookieValue = readLS(key)

      expect(cookieValue).toBe(value)
      deleteLS(key)
    })
  })

  describe('isLSEmpty', () => {
    it('Should return false', () => {
      upsertLS(key, value)
      expect(isLSEmpty(key)).toBe(false)
    })

    it('Should return false', () => {
      upsertLS(key, null)
      expect(isLSEmpty(key)).toBe(false)
    })
  })

  describe('removeAllLSs', () => {
    it('Should return true', () => {
      removeAllLSs()
      expect(localStorage).toMatchObject({})
    })
  })
})
