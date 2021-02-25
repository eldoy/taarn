/**
* @jest-environment node
*/

const taarn = require('../index.js')

const url = 'http://localhost:7000'

describe('taarn', () => {
  beforeAll(async () => {
    await new Promise(r => setTimeout(r, 500))
  })

  it('should do get', async () => {
    const result = await taarn(url, {}, { method: 'get', path: '/get' })
    expect(result.body.status).toEqual('OK')
  })

  it('should do post', async () => {
    const result = await taarn(url, {}, { path: '/post' })
    expect(result.body.status).toEqual('OK')
  })

  it('should do with params', async () => {
    const result = await taarn(url, { hello: 'taarn' }, { path: '/params' })
    expect(result.body.hello).toEqual('taarn')
  })

  it('should send custom headers', async () => {
    const result = await taarn(url, { hello: 'taarn' }, { path: '/headers', headers: { 'x-custom-header': 'custom' } })
    expect(result.body.headers).toEqual('custom')
  })

  it('should do upload', async () => {
    const files = ['test/assets/hello.txt']
    const result = await taarn(url, {}, { path: '/upload', files, progress: true })
    expect(result.body.success).toEqual(true)
    expect(result.body.urls[0]).toEqual('hello.txt')
  })
})