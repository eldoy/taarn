var fs = require('fs')
var fspath = require('path')
var request = require('request')

module.exports = function(url, options = {}) {
  return new Promise(function(resolve, reject) {
    var httpOptions = {
      method: options.method || 'post',
      url: url + (options.path || '/'),
      headers: options.headers,
      json: true
    }
    if (options.files) {
      options.files = options.files.map(function(file) {
        return fs.createReadStream(fspath.join(process.cwd(), file))
      })
      httpOptions.formData = { ...options.params, file: options.files }
    } else {
      httpOptions.body = options.params
    }
    var req = request(
      httpOptions,
      function(err, res, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      }
    )
    if (options.progress) {
      var received = 0, total = 0
      req.on('data', function(chunk) {
        received += chunk.length
        var percentage = (received * 100 / total).toFixed(2)
        if (typeof options.progress === 'function') {
          options.progress({ received, total, percentage })
        } else {
          process.stdout.write(`\r${ percentage }%\t\t`)
        }
      })
      req.on('response', function(res) {
        total = parseInt(res.headers['content-length'])
      })
    }
  })
}
