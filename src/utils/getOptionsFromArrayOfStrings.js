import fast from 'fast.js'

export const getOptionsFromArrayOfStrings = (arrayOfStrings) => (arrayOfStrings.length > 0
  ? fast.map(arrayOfStrings, (value) => ({
    key: value,
    value,
    text: value
  })) : [])
