const http = require('http')
const bodyparser = require('bparse')
const url = require('url')

/*******************************************
* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
* ----- HTTP SERVER -----------------------
* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
*******************************************/

const util = {}
const server = {}
const routes = {}
let httpServer

const PORT = 7000

/*******************************************
* ----- UTIL ------------------------------
*******************************************/

// Enable CORS
util.enableCors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control')
}

// Set path for request
util.setPath = (req) => {
  req.path = url.parse(req.url, true).path
}

// Write error message
util.err = (res, message) => {
  console.log(`Error message: ${message}`)
  util.send(res, { error: { message } })
}

// Write end response
util.send = (res, data = '') => {
  const str = JSON.stringify(data)
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Content-Length', Buffer.byteLength(str))
  res.end(str)
}

/*******************************************
* ----- SERVER -----------------------------
*******************************************/

server.request = async (req, res) => {
  util.setPath(req)
  util.enableCors(res)

  if (req.method === 'OPTIONS') {
    return util.send(res)
  }

  await bodyparser(req)
  console.log(req.url)

  switch(req.path) {
    case '/get': return routes.get(req, res)
    case '/post': return routes.post(req, res)
    case '/upload': return routes.upload(req, res)
  }
}

/*******************************************
* ------- ROUTES --------------------------
*******************************************/

routes.get = async (req, res) => {
  util.send(res, { status: 'OK' })
}

routes.post = async (req, res) => {
  util.send(res, { status: 'OK' })
}

routes.upload = async (req, res) => {
  const urls = []
  for (const file of req.files) {
    urls.push(file.name)
  }
  util.send(res, { success: true, urls })
}

/*******************************************
* ----- INIT -------------------------------
*******************************************/

httpServer = new http.createServer()
httpServer.on('request', server.request)
httpServer.listen(PORT)
console.log(`Server listening on port ${PORT}`)
