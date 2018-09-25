# HTTP Client for web browsers

Does ajax and uploads from the browser. It's using promises and returns JSON data.

### INSTALLATION
```npm i webflux``` or ```yarn add webflux```

### USAGE
On your Node.js server:
```javascript
import Http from 'webflux'
const http = new Http('http://example.com')

const data = await http.request({
  method: 'get',
  path: '/get'
})
```
Enjoy! MIT Licensed.
