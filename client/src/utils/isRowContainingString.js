export const isRowContainingString = ({
  row,
  searchFilter
}) => {
  if (searchFilter.length === 0) {
    return true
  }

  if (row.by.indexOf(searchFilter) > -1) {
    return true
  }

  if (row.title.indexOf(searchFilter) > -1) {
    return true
  }

  return false
}
