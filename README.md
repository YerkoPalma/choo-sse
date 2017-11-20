# choo-sse [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5]
[![downloads][8]][9] [![js-standard-style][10]][11]

Small wrapper around [server-sent event][sse] browser API, for choo apps

## Usage
```js
var choo = require('choo')
var html = require('choo/html')

var app = choo()
app.use(require('choo-sse')('/sse'))
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
    emitter.on('sse:message', (data, event) => {
      var msgElement = document.getElementById('counter')
      msgElement.textContent = data
    })
    emitter.on('sse:error', err => {
      emitter.emit('log:error', err)
    })
  })
}
```

## Events
### `sse:error` | `sse.events.ERROR`
Emitted if the Event Source constructor or any of its methods throws an exception.

### `sse:open` | `sse.events.OPEN`
Emitted when the connection is established with the server.

### `sse:close` | `sse.events.CLOSE`
Emitted when the connection is closed.

### `sse:message` | `sse.events.MESSAGE`
Listen to this event to get messages from the server.

## API
### `plugin = sse([route], [opts])`

The plugin accepts two parameters. You must pass the `route` for the 
Event Source object. Also you can pass some options as a second argument.

- `withCredentials`: Boolean. Indicate if CORS should be set to `include` 
credentials. Defaults to `false`.

If the object is correctly created, then you have an object in the state 
of your app with the following properties:

- `state`: A string describing the state of the connection, can be `CONNECTING`, 
`OPEN ` or `CLOSED `.
- `url`: A string with the url of the source.
- `withCredentials`: A boolean indicating if the Event Source object was 
instantiated with CORS credentials.

## See Also
- [choo-websockets][choo-websockets] - Small wrapper around WebSocket browser API, for choo apps

## License
[MIT](/LICENSE)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/choo-sse.svg?style=flat-square
[3]: https://npmjs.org/package/choo-sse
[4]: https://img.shields.io/travis/YerkoPalma/choo-sse/master.svg?style=flat-square
[5]: https://travis-ci.org/YerkoPalma/choo-sse
[6]: https://img.shields.io/codecov/c/github/YerkoPalma/choo-sse/master.svg?style=flat-square
[7]: https://codecov.io/github/YerkoPalma/choo-sse
[8]: http://img.shields.io/npm/dm/choo-sse.svg?style=flat-square
[9]: https://npmjs.org/package/choo-sse
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
[sse]: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
[choo-websockets]: https://github.com/YerkoPalma/choo-websocket