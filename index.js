const b4a = require('b4a')

unslab.all = all
module.exports = unslab

function unslab (buf) {
  const copy = b4a.allocUnsafeSlow(buf.byteLength)
  copy.set(buf, 0)
  return copy
}

function all (list) {
  let size = 0
  for (let i = 0; i < list.length; i++) size += list[i].byteLength
  const copy = b4a.allocUnsafeSlow(size)
  const result = new Array(list.length)
  let offset = 0
  for (let i = 0; i < list.length; i++) {
    const buf = list[i]
    copy.set(buf, offset)
    result[i] = copy.subarray(offset, offset += buf.byteLength)
  }
  return result
}
