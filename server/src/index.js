import express from 'express'
import rateLimit from 'express-rate-limit'
import { article } from './routes/article'
import { articles } from './routes/articles'
import {
  ROUTE_ARTICLES,
  ROUTE_ARTICLE_ID
} from './constants/routes'

const app = express()

//  apply to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

app.use(limiter)

app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, authorization, x-auth-token'
  )
  res.setHeader('Access-Control-Expose-Headers', 'x-auth-token, authorization')
  res.removeHeader('X-Powered-By')

  next()
})

// app.route('/book').get(function (req, res) {
//   res.send('Get a random book')
// })
// var router = express.Router()
//
// router.route
app.get(ROUTE_ARTICLES, (req, res) => articles(req, res))

// articles(req, res)
//   return true
// })
//
app.get(ROUTE_ARTICLE_ID, (req, res) => article(req, res))

// console.log({ addCorsHeaders })
// app.get(ROUTE_ARTICLES, (req, res) => {
//   // addCorsHeaders(res)
//   //
//   // console.log({ req })
//   res.send({ test: 'ok' })
// })

const port = process.env.PORT || '4000'

app.listen(port, () =>
  console.log(`Listening on port ${port}!`),
)
