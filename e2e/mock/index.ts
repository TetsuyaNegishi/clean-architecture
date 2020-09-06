import db from './db'
import * as jsonServer from 'json-server'

const server = jsonServer.create()

const transformPostPath = (req, res, next) => {
  if (req.method === 'POST') {
    req.method = 'GET'
    req.url += '_post'
  }
  next()
}

const middlewares = [transformPostPath, ...jsonServer.defaults(), ]

server.use(middlewares)

server.use(jsonServer.rewriter({
  "/v1/*": "/$1"
}));

const router = jsonServer.router(db);
server.use(router)

server.listen(4000, () => {
  console.log('JSON Server is running')
})
