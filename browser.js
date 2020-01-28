module.exports = function(url, params, options) {
  return new Promise(function(resolve, reject) {
    if (!options) options = {}
    if (!params) params = {}
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('load', function(event) {
      var json = JSON.parse(xhr.responseText)
      resolve(json)
    })
    xhr.addEventListener('error', function(event){
      reject(xhr)
    })
    xhr.open(options.method || 'POST', url + (options.path || '/'))

    // Set up upload if we have files
    var data
    if (options.files) {
      data = new FormData()

      // Add params to data
      for (var key in params) {
        data.append(key, params[key])
      }

      // Loop through each of the selected files
      for (var file of options.files) {
        data.append('file', file, file.name)
      }

      if (options.progress) {
        xhr.upload.addEventListener('progress', function(event) {
          event.percent = (event.loaded / event.total * 100).toFixed(2)
          options.progress(event)
        })
      }
    } else {
      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
    }

    // Send data to server
    xhr.send(data || JSON.stringify(params))
  })
}