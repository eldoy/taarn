class Http {
  constructor (url) {
    this.url = url
  }

  request (options) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      if (!options) {
        options = {}
      }
      if (options.method) {
        options.method = options.method.toUpperCase()
      } else {
        options.method = 'POST'
      }
      if (!options.url) {
        options.url = this.url
      }
      if (!options.path) {
        options.path = '/'
      }
      if (!options.params) {
        options.params = {}
      }

      // Encode params
      for (let p in options.params) {
        options.params[p] = encodeURIComponent(options.params[p])
      }

      if (options.async !== false) {
        options.async = true
      }

      if (!options.headers) {
        options.headers = {}
      }

      let formData
      if (options.files) {
        if (!options.name) {
          options.name = 'files[]'
        }

        formData = new FormData()

        // Loop through each of the selected files
        for (let file of options.files) {
          // Check the file type
          // TODO: Add option for this
          // if (!file.type.match('image.*')) {
          //   continue;
          // }

          // Add the file to the request
          formData.append(options.name, file, file.name)
        }

        if (options.progress) {
          xhr.upload.addEventListener('progress', function (event) {
            console.log('PROGRESS')
            console.log(event)
            var percent = (event.loaded / event.total * 100).toFixed(2)
            console.log(`${percent}%`)
            options.progress(event)
          })
        }

      // Add content type if it doesn't exist
      } else if (!Object.keys(options.headers).map(x => x.toLowerCase()).includes('content-type')) {
        options.headers['Content-Type'] = 'application/json; charset=utf-8'
      }

      xhr.addEventListener('load', (event) => {
        console.log('HTTP RESPONSE:', xhr.responseText)
        const json = JSON.parse(xhr.responseText)
        resolve(json)
      })

      xhr.addEventListener('error', (event) => {
        console.log('REQUEST ERROR:', event)
        reject(xhr)
      })

      xhr.open(options.method, `${options.url}${options.path}`, options.async)

      // Set headers
      for (let header in options.headers) {
        xhr.setRequestHeader(header, options.headers[header])
      }

      const data = formData || JSON.stringify(options.params)

      // Send data to server
      xhr.send(data)
    })
  }
}

export default Http
