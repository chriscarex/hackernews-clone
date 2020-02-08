import fetch from 'node-fetch'
import {
  BASE_ENDPOINT,
  ENDPOINT_NEWS
} from '../constants/endpoints'

export const articles = async (req, res) => {
  const response = {
    error: true,
    data: []
  }

  const articlesResponse = await fetch(BASE_ENDPOINT + ENDPOINT_NEWS)

  if (articlesResponse) {
    const articles = await articlesResponse.json()

    response.data = articles
    response.error = false
  }

  return res.send(response)
}
