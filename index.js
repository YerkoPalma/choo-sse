/* global EventSource */
var assert = require('assert')

module.exports = sse

var events = sse.events = {
  OPEN: 'sse:open',
  CLOSE: 'sse:close',
  MESSAGE: 'sse:message',
  ERROR: 'sse:error'
}

function sse (route, opts) {
  opts = opts || {}
  assert.equal(typeof name, 'string', 'choo-sse: route should be type string')
  assert.equal(typeof opts, 'object', 'choo-sse: opts should be type object')

  return function (state, emitter) {
    assert.equal(typeof state, 'object', 'choo-sse: state should be type object')
    assert.equal(typeof emitter, 'object', 'choo-sse: emitter should be type object')

    var eventSource
    try {
      eventSource = new EventSource(route)
      state.sse = {}
      Object.defineProperty(state.sse, 'state', { get: function () {
          if (eventSource.readyState === 0) return 'CONNECTING'
          if (eventSource.readyState === 1) return 'OPEN'
          if (eventSource.readyState === 2) return 'CLOSED'
          // unlikely, but stills
          return 'UNKNOWN'
        }
      })
      Object.defineProperty(state.sse, 'url', { get: function () {
          return eventSource.url
        }
      })
      Object.defineProperty(state.sse, 'withCredentials', { get: function () {
          return eventSource.withCredentials
        }
      })
      eventSource.onmessage = function (e) {
        emitter.emit(events.MESSAGE, e)
      }
      eventSource.onerror = function (e) {
        emitter.emit(events.ERROR, e)
      }
      eventSource.onopen = function (e) {
        emitter.emit(events.OPEN, e)
      }
      emitter.on(events.CLOSE, function () {
        eventSource.close()
      })
    } catch (e) {
      emitter.emit(events.ERROR, e)
    }
  }
}
