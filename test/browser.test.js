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
    const result = await taarn(url, {}, { method: 'get', path: '/get' })
    expect(result.status).toEqual('OK')
  })

  it('should do post', async () => {
    const result = await taarn(url, {}, { method: 'post', path: '/post' })
    expect(result.status).toEqual('OK')
  })

  it('should do with params', async () => {
    const result = await taarn(url, { hello: 'taarn' }, { path: '/params' })
    expect(result.hello).toEqual('taarn')
  })

  it('should send custom headers', async () => {
    const result = await taarn(url, { hello: 'taarn' }, { path: '/headers', headers: { 'x-custom-header': 'custom' } })
    expect(result.headers).toEqual('custom')
  })

  it('should do upload', async () => {
    const files = [ new File([''], 'filename.txt') ]
    const result = await taarn(url, {}, { path: '/upload', files })
    expect(result.success).toEqual(true)
    expect(result.urls[0]).toEqual('filename.txt')
  })

  it('should do upload with params', async () => {
    const files = [ new File([''], 'filename.txt') ]
    const params = { config: { resize: [1, 2] } }
    const result = await taarn(url, params, { path: '/upload', files })
    expect(result.success).toEqual(true)
    expect(result.urls[0]).toEqual('filename.txt')
    expect(result.params.config.resize).toEqual([1, 2])
  })
})
