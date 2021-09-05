const fs = require('fs')
const fspath = require('path')
const got = require('got')
const FormData = require('form-data')

const DEFAULT_OPTIONS = {
  method: 'post',
  responseType: 'json',
  allowGetBody: true
}

module.exports = async function(url, params = {}, options = {}) {
  options = Object.assign({}, DEFAULT_OPTIONS, options)
  const { path = '', progress, files, ...config } = options
  if (files) {
    const form = new FormData()
    for (const file of files) {
      const filePath = fspath.join(process.cwd(), file)
      const stream = fs.createReadStream(filePath)
      form.append('file', stream)
    }
    for (const name in params) {
      form.append(name, params[name])
    }
    config.body = form
  } else {
    config.json = params
  }
  const result = await got(url + path, config)
  return result.body
}
