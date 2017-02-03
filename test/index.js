const expect = require('chai').expect
const request = require('supertest')
const app = require('../server')
const io = require('socket.io-client')
const socketURL = 'http://localhost:3000'
const options = {
  transports: ['websocket'],
  'force new connection': true
}

// ------------------------------------
// Express route tests
// ------------------------------------

describe('GET /', () => {
  it('respond with the proper html template', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.text).to.contain(
          '<title>Real Time Polling | Home</title>')
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe('GET /login', () => {
  it('respond with the proper html template', (done) => {
    request(app)
      .get('/login')
      .expect(200)
      .expect((res) => {
        expect(res.text).to.contain(
          '<title>Real Time Polling | Login</title>')
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe('GET /polls/pollid', () => {
  it('respond with the proper html template', (done) => {
    request(app)
      .get('/polls/pollid')
      .expect(200)
      .expect((res) => {
        expect(res.text).to.contain(
          '<title>Real Time Polling | Your Poll</title>')
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe('undefined routes', () => {
  it('respond with a 404', (done) => {
    request(app)
      .get('/not-real')
      .expect(404, done)
  })
})

describe('GET /api/polls', () => {
  it('respond with an object', (done) => {
    request(app)
      .get('/api/polls')
      .expect(200)
      .expect((res) => {
        expect(res.body).to.be.an('object')
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

// ------------------------------------
// Web Socket Tests
// ------------------------------------

describe('Socket tests', () => {
  it('should test', (done) => {
    const client1 = io.connect(socketURL, options)

    client1.on('connect', (data) => {
      done()
    })
  })
})
