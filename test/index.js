const expect = require('chai').expect
const request = require('supertest')

const app = require('../server')

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
