/**
* @jest-environment jsdom
*/

const taarn = require('../browser.js')

const url = 'http://localhost:7000'

describe('taarn', () => {
  beforeAll(async () => {
    await new Promise(r => setTimeout(r, 500))
  })

  it('should do get', async () => {
    const data = await taarn(url, { method: 'get', path: '/get' })
    expect(data.status).toEqual('OK')
  })

  it('should do post', async () => {
    const data = await taarn(url, { method: 'post', path: '/post' })
    expect(data.status).toEqual('OK')
  })

  it('should do upload', async () => {
    const files = [ new File([''], 'filename.txt') ]
    const data = await taarn(url, { path: '/upload', files })
    expect(data.success).toEqual(true)
    expect(data.urls[0]).toEqual('filename.txt')
  })
})
