const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.rewriter({
  "/v1/*": "/$1"
}));

const db = require('./db.json');
const router = jsonServer.router(db);
server.use(router)

server.listen(4000, () => {
  console.log('JSON Server is running')
})
