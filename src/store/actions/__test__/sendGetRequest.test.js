/* eslint import/named:0 */
import { stub } from 'sinon'
import { sendGetRequest, __RewireAPI__ } from '../sendGetRequest'

const jsonResponse =  true
const errorResponse = {error: true}

let fetchStub
describe('sendGetRequest', () => {
  afterEach(() => {
    __RewireAPI__.__ResetDependency__('fetch')
    fetchStub.resetHistory()
  })

  it('should fetch and return error', async () => {
    fetchStub = stub().resolves({
      json: () => errorResponse
    })
    __RewireAPI__.__Rewire__('fetch', fetchStub)

    const endpoint = 'http://0.0.0.0:8080'

    const result = await sendGetRequest({
      endpoint
    })

    expect(fetchStub.getCall(0).args[0]).toEqual(endpoint)
    expect(result).toEqual(errorResponse)
  })

  it('should fetch and return true', async () => {
    fetchStub = stub().resolves({
      json: () => jsonResponse
    })
    __RewireAPI__.__Rewire__('fetch', fetchStub)

    const endpoint = 'http://0.0.0.0:8080'

    const result = await sendGetRequest({
      endpoint
    })

    expect(fetchStub.getCall(0).args[0]).toEqual(endpoint)
    expect(result).toEqual(true)
  })
})
