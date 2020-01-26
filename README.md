# HTTP Client for web browsers

Does ajax and uploads from the browser. It's using promises and returns JSON data.

### INSTALLATION
```npm i webflux```

### USAGE
On your Node.js server:
```js
import Http from 'webflux'

// Constructor takes the URL of your server
const http = new Http('http://example.com')

// Default parameters shown
try {
  const data = await http.request({
    url: this.url, // Override the constructor URL
    method: 'POST', // Case insensitive
    path: '/',
    params: {}, // Ignored if uploading
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    async: true,

    // Upload options
    files: [], // Add files from input.files to do an upload
    name: 'files[]', // Name of upload parameter
    match: undefined, // Regex or string file filter, example: 'image.*'
    progress: (event) => { // Upload progress
      var percent = (event.loaded / event.total * 100).toFixed(2)
      console.log(`${percent}%`)
    }
  })
} catch (err) {
  // Catch any errors with try / catch
  console.log('ERROR:', err.message)
}
```
Enjoy! MIT Licensed.
