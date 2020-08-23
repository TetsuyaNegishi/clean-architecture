import db from './db'
import * as jsonServer from 'json-server'

const server = jsonServer.create()
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.rewriter({
  "/v1/*": "/$1"
}));

const router = jsonServer.router(db);
server.use(router)

server.listen(4000, () => {
  console.log('JSON Server is running')
})
