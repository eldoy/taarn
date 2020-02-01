# Light weight isomorphic HTTP Client

Does ajax and uploads from the browser and NodeJS. Support for file upload progress with percentage.

### INSTALLATION
```npm i taarn```

### USAGE
On your Node.js server:
```js
var taarn = require('taarn')

// Normal usage
var data = await taarn(url, params, options)

// Usage with default options shown
var url = 'https://example.com'
var data = await taarn(
  url,
  { data: { hello: 'world' } },
  {
    method: 'POST',
    path: '/',
    files: ['filename.txt'],
    progress: function(event) {
      console.log(event.percent, event.total, event.loaded)
    }
  }
)
```

MIT Licensed.Enjoy!
