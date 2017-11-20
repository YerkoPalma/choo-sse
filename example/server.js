const fastify = require('fastify')()
fastify.register(require('fastify-bankai'), {
  entry: './example/client.js'
})

fastify.register(require('fastify-sse'), (err) => {
  if (err) {
    throw err
  }
})

fastify.route({
  method: 'GET',
  url: '/sse',
  handler: (request, reply) => {
    let index = 0

    // Send the first data
    reply.sse('init')

    setInterval(() => {
      reply.sse(index.toString())
      index++
    }, 1000)
  }
})

fastify.addHook('onClose', (instance, done) => {
  instance._Reply.sse()
  done()
})

fastify.listen(process.env.PORT || 8080, process.env.IP || 'localhost', err => {
  if (err) throw err
  console.log(`server listening on ${process.env.IP}:${process.env.PORT}`)
})
