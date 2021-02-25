const fs = require('fs')
const fspath = require('path')
const got = require('got')
const FormData = require('form-data')

module.exports = function(url, params = {}, options = {}) {
  const { path = '', method = 'post', headers, progress, files } = options
  var config = {
    method,
    headers,
    responseType: 'json',
    allowGetBody: true
  }

  if (files) {
    const form = new FormData()
    for (const file of files) {
      console.log({ file })
      const filePath = fspath.join(process.cwd(), file)
      const stream = fs.createReadStream(filePath)
      form.append('file', stream)
    }
    config.body = form
  } else {
    config.json = params
  }
  return got(url + path, config)
}
