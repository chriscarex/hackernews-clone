import fetch from 'node-fetch'
import {
  BASE_ENDPOINT,
  ENDPOINT_ARTICLE
} from '../constants/endpoints'

export const article = async (req, res) => {
  const response = {
    error: true,
    data: []
  }

  // console.log(req.params)

  const { id } = req.params

  if (!id) {
    return res.send(response)
  }

  const articleResponse = await fetch(BASE_ENDPOINT + ENDPOINT_ARTICLE + id + '.json')

  // console.log(BASE_ENDPOINT + ENDPOINT_ARTICLE + id)
  // console.log({
  //   articleResponse
  // })
  if (articleResponse) {
    const article = await articleResponse.json()

    response.data = article
    response.error = false
  }

  return res.send(response)
}
