module.exports = function(url, options) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest()
    options.method = options.method ? options.method.toUpperCase() : 'POST'
    if (!options.path) options.path = '/'
    if (options.async !== false) options.async = true
    if (!options.headers) options.headers = {}
    if (!options.params) options.params = {}

    // Encode params
    for (var p in options.params) {
      options.params[p] = encodeURIComponent(options.params[p])
    }

    // Set up upload if we have files
    var formData
    if (options.files) {
      if (!options.name) options.name = 'files[]'
      formData = new FormData()

      // Loop through each of the selected files
      for (var file of options.files) {
        // Check the file type, regex or string matcher
        // Example: 'image.*'
        if (!options.match || file.type.match(options.match)) {
          // Add the file to the request
          formData.append(options.name, file, file.name)
        }
      }

      if (options.progress) {
        xhr.upload.addEventListener('progress', function (event) {
          event.percent = (event.loaded / event.total * 100).toFixed(2)
          options.progress(event)
        })
      }
    // Add content type if it doesn't exist
    } else if (!Object.keys(options.headers).map(function(x) { return x.toLowerCase() }).includes('content-type')) {
      options.headers['Content-Type'] = 'application/json; charset=utf-8'
    }

    xhr.addEventListener('load', function(event) {
      var json = JSON.parse(xhr.responseText)
      resolve(json)
    })

    xhr.addEventListener('error', function(event){
      reject(xhr)
    })

    xhr.open(options.method, url + options.path, options.async)

    // Set headers
    for (var header in options.headers) {
      xhr.setRequestHeader(header, options.headers[header])
    }

    var data = formData || JSON.stringify(options.params)

    // Send data to server
    xhr.send(data)
  })
}
