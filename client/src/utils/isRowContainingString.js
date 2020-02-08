import fast from 'fast.js'

export const isRowContainingString = ({
  row,
  headerData,
  searchFilter
}) => {
  if (searchFilter.length === 0) {
    return true
  }

  let isRowValid = false

  fast.map(headerData, (headerKey) => {
    if (row[headerKey] && row[headerKey].toString().toLowerCase().includes(searchFilter)) {
      isRowValid = true
    }
  })

  return isRowValid
}
