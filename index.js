var fs = require('fs')
var fspath = require('path')
var request = require('request')

module.exports = function(url, options) {
  return new Promise(function(resolve, reject) {
    if (!options) options = {}
    if (options.async !== false) options.async = true
    if (!options.headers) options.headers = {}
    if (!options.params) options.params = {}

    // Encode params
    for (var value in options.params) {
      options.params[value] = encodeURIComponent(options.params[value])
    }

    var formData = {}
    if (options.files) {
      if (!options.name) options.name = 'file'
      formData[options.name] = []

      // Loop through each of the selected files
      for (var file of options.files) {
        var path = fspath.join(process.cwd(), file)
        var stream = fs.createReadStream(path)
        formData[options.name].push(stream)
      }

      // Add content type if it doesn't exist
      if (!options.headers['content-type']) {
        options.headers['content-type'] = 'multipart/form-data'
      }

    } else if (!Object.keys(options.headers).map(function(x) { return x.toLowerCase() }).includes('content-type')) {
      options.headers['content-type'] = 'application/json; charset=utf-8'
    }

    var req = request(
      {
        method: options.method || 'post',
        url: url + (options.path || '/'),
        headers: options.headers,
        formData
      },
      function(err, res, data) {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(data))
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
