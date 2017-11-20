var choo = require('choo')
var html = require('choo/html')

var app = choo()
app.use(require('..')('/sse'))
app.use(live)
app.route('/', mainView)
app.mount('body')

function mainView (state, emit) {
  return html`
    <body>
      <h2>Counter example</h2>
      <h3>Numbers are sent by the server</h3>
      <span id="counter"></span>
    </body>
  `
}

function live (state, emitter) {
  emitter.on('DOMContentLoaded', function () {
    emitter.on('sse:message', (event) => {
      var msgElement = document.getElementById('counter')
      msgElement.textContent = event.data
    })
    emitter.on('sse:error', err => {
      emitter.emit('log:error', err)
    })
  })
}
