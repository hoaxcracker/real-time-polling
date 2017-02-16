const expect = require('chai').expect
const request = require('supertest')
const app = require('../server').app
const io = require('socket.io-client')
const socketURL = 'http://localhost:3000'
const options = {
  transports: ['websocket'],
  'force new connection': true
}

// ------------------------------------
// Mock data
// ------------------------------------

const poll = {
  tite: 'Poll Title',
  options: [
    { text: 'option1', profiles: {} },
    { text: 'option2', profiles: {} }
  ]
}

const profile = {
  nickname: 'fullProfile.nickname',
  photo: 'fullProfile.picture',
  uid: 'fullProfile.user_id'
}

const votePackage = {
  profile,
  uid: profile.uid,
  vote: 1,
  pollId: undefined
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

describe('POST /api/polls', () => {
  it('respond with an object containing a new poll object', (done) => {
    request(app)
      .post('/api/polls')
      .send(poll)
      .expect((res) => {
        const resPoll = res.body[Object.keys(res.body)[0]]

        expect(Object.keys(res.body).length).to.equal(1)
        expect(resPoll).to.deep.equal(poll)
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

// describe('Socket tests', () => {
//   it('should authenticate the user and return a poll on connection', (done) => {
//     const client1 = io.connect(socketURL, options)
//     const pollId = Object.keys(app.locals.polls)[0]
//
//     client1.on('requestAuth', (data) => {
//       client1.emit('returnAuthRequestPoll', { profile, pollId })
//     })
//
//     client1.on('returnInitialPoll', (data) => {
//       done()
//     })
//   })
//
//   it('should return an error if the profile is incomplete', (done) => {
//     const client1 = io.connect(socketURL, options)
//     const pollId = Object.keys(app.locals.polls)[0]
//     const profile = {
//       nickname: 'fullProfile.nickname',
//       photo: 'fullProfile.picture'
//     }
//
//     client1.on('requestAuth', (data) => {
//       client1.emit('returnAuthRequestPoll', { profile, pollId })
//     })
//
//     client1.on('returnErr', (data) => {
//       done()
//     })
//   })
//
//   it('should send a new poll object to all connected clients when any client votes', (done) => {
//     const client1 = io.connect(socketURL, options)
//     const client2 = io.connect(socketURL, options)
//     const pollId = Object.keys(app.locals.polls)[0]
//     votePackage.pollId = pollId
//
//     client1.emit('vote', votePackage)
//
//     client2.on('returnNewPoll', (data) => {
//       done()
//     })
//   })
// })
