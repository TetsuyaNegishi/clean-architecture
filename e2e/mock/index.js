const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.rewriter({
  '/api/test': '/test'
}));

const router = jsonServer.router({
  "test": {
		"text": "Learn React"
	}
})
server.use(router)

server.listen(4000, () => {
  console.log('JSON Server is running')
})
