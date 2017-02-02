// const expect = require('chai').expect
const request = require('supertest')
const app = require('../server')
const io = require('socket.io-client')
const socketURL = 'http://localhost:3000'
const options = {
  transports: ['websocket'],
  'force new connection': true
}

describe('GET /', () => {
  it('responds with success', (done) => {
    request(app)
      .get('/')
      .expect(200, done)
  })
})

describe('undefined routes', () => {
  it('respond with a 404', (done) => {
    request(app)
      .get('/not-real')
      .expect(404, done)
  })
})

describe('Socket tests', () => {
  it('should test', (done) => {
    const client1 = io.connect(socketURL, options)

    client1.on('connect', (data) => {
      done()
    })
  })
})
