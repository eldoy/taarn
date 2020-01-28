module.exports = function(url, params, options) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest()
    if (!options) options = {}
    if (!params) params = {}
    if (!options.headers) options.headers = {}

    // Set up upload if we have files
    var formData
    if (options.files) {
      formData = new FormData()

      // Add params to form data
      for (var key in params) {
        formData.append(key, params[key])
      }

      // Loop through each of the selected files
      for (var file of options.files) {
        formData.append('file', file, file.name)
      }

      if (options.progress) {
        xhr.upload.addEventListener('progress', function(event) {
          event.percent = (event.loaded / event.total * 100).toFixed(2)
          options.progress(event)
        })
      }

      // Add content type
      options.headers['content-type'] = 'multipart/form-data'
    }

    xhr.addEventListener('load', function(event) {
      var json = JSON.parse(xhr.responseText)
      resolve(json)
    })

    xhr.addEventListener('error', function(event){
      reject(xhr)
    })

    xhr.open(options.method || 'post', url + (options.path || '/'))

    // Set headers
    if (!options.headers['content-type']) {
      options.headers['content-type'] = 'application/json; charset=utf-8'
    }
    for (var header in options.headers) {
      xhr.setRequestHeader(header, options.headers[header])
    }

    var data = formData || JSON.stringify(params)

    // Send data to server
    xhr.send(data)
  })
}
