import fetch from 'isomorphic-fetch'

export const sendGetRequest = async ({
  endpoint
}) => {
  const response = await fetch(endpoint, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).catch(
    () => {
      return { error: true }
    }
  )

  if (response.error) {
    return response.error
  }

  const result = await response.json()

  return result
}
