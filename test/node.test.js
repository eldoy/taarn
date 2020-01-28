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
    const data = await taarn(url, {}, { method: 'get', path: '/get' })
    expect(data.status).toEqual('OK')
  })

  it('should do post', async () => {
    const data = await taarn(url, {}, { path: '/post' })
    expect(data.status).toEqual('OK')
  })

  it('should do with params', async () => {
    const data = await taarn(url, { hello: 'taarn' }, { path: '/params' })
    expect(data.hello).toEqual('taarn')
  })

  it('should do upload', async () => {
    const files = ['test/assets/hello.txt']
    const data = await taarn(url, {}, { path: '/upload', files, progress: true })
    expect(data.success).toEqual(true)
    expect(data.urls[0]).toEqual('hello.txt')
  })
})