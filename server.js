const Sirloin = require('sirloin')

const app = new Sirloin({ port: 7000 })

app.use(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Headers', 'x-custom-header')
})

app.post('/upload', async (req, res) => {
  const urls = []
  for (const file of req.files) {
    urls.push(file.name)
  }
  return { success: true, urls, params: req.params }
})

app.post('/post', async (req, res) => {
  return { status: 'OK' }
})

app.post('/params', async (req, res) => {
  return req.params
})

app.get('/get', async (req, res) => {
  return { status: 'OK' }
})

app.post('/headers', async (req, res) => {
  return { headers: req.headers['x-custom-header'] }
})
