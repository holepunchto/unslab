const unslab = require('./')
const test = require('brittle')
const b4a = require('b4a')

test('basic', function (t) {
  const result = unslab(b4a.from('hello world'))

  t.is(result.buffer.byteLength, result.byteLength)

  const [a, b] = unslab.all([b4a.from('hello'), b4a.from('world')])

  t.ok(a.buffer === b.buffer)
  t.is(a.byteLength + b.byteLength, a.buffer.byteLength)
})

test('only when needed', function (t) {
  const buf = b4a.alloc(4)

  t.is(unslab(buf), buf)
})

test('all skips over nulls', function (t) {
  const buf = b4a.alloc(4)
  t.alike(unslab.all([buf, null]), [buf, null], 'copies through null entries')
})

test('accepts null', function (t) {
  t.is(unslab(null), null)
})
