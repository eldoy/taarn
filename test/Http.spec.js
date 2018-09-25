const fs = require('fs')

import Http from '../lib/http.js'
const http = new Http('http://localhost:7000')

describe('Http', () => {
  it('should do get', async () => {
    const data = await http.request({
      method: 'get',
      path: '/get'
    })
    expect(data.status).toEqual('OK')
  })

  it('should do post', async () => {
    const data = await http.request({
      method: 'post',
      path: '/post'
    })
    expect(data.status).toEqual('OK')
  })

  it('should do upload', async () => {
    const file = new File([''], 'filename.txt')
    const data = await http.request({
      path: '/upload',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      files: [ file ]
    })
    expect(data.success).toEqual(true)
    expect(data.urls[0]).toEqual('filename.txt')
  })
})