export const addCorsHeaders = res => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, authorization, x-auth-token'
  )
  res.setHeader(
    'Access-Control-Expose-Headers',
    'x-auth-token, authorization'
  )
}
