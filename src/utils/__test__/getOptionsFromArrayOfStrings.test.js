import { getOptionsFromArrayOfStrings } from '..'

describe('getOptionsFromArrayOfStrings', () => {
  it('should return empty arrays if empty list', async () => {
    const arrayOfString = []

    const triples = await getOptionsFromArrayOfStrings(arrayOfString)

    const output = []

    expect(triples).toMatchObject(output)
  })

  it('should return vales if array is not empty', async () => {
    const arrayOfString = ['test', 'test2']

    const triples = await getOptionsFromArrayOfStrings(arrayOfString)

    const output = [{
      key: arrayOfString[0],
      value: arrayOfString[0],
      text: arrayOfString[0]
    },
    {
      key: arrayOfString[1],
      value: arrayOfString[1],
      text: arrayOfString[1]
    }]

    expect(triples).toMatchObject(output)
  })
})
