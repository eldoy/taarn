# HTTP Client for web browsers

Does ajax and uploads from the browser. It's using promises and returns JSON data.

### INSTALLATION
```npm i webflux``` or ```yarn add webflux```

### USAGE
On your Node.js server:
```javascript
import Http from 'webflux'
const http = new Http('http://example.com')

// Default parameters shown
try {
  const data = await http.request({
    method: 'post',
    path: '/',
    files: [], // Add files from input.files to do an upload
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    async: true,
    params: {}
  })
} catch (err) {
  console.log('ERROR:', err.message)
}
```
Enjoy! MIT Licensed.
