const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const shortid = require('shortid')
const path = require('path')
const server = require('http').Server(app)
const io = require('socket.io')(server)

// ------------------------------------
// REST API
// ------------------------------------

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.set('port', process.env.PORT || 3000)

app.locals.polls = {}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/login.html'))
})

app.get('/polls/:poll_id', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/polls.html'))
})

app.get('/api/polls', (req, res) => {
  res.json(app.locals.polls)
})

app.post('/api/polls', (req, res) => {
  app.locals.polls[shortid()] = req.body
  res.json(app.locals.polls)
})

// ------------------------------------
// Web Sockets
// ------------------------------------

io.on('connection', (socket) => {
  socket.emit('requestAuth')

  socket.on('returnAuthRequestPoll', ({ profile, pollId }) => {
    const { nickname, photo, uid } = profile

    if (nickname && photo && uid) {
      socket.emit('returnInitialPoll', app.locals.polls[pollId])
    } else {
      socket.emit('returnErr', (
        'There was an issue authenticating your account. Please log out and try again.'
      ))
    }
  })

  socket.on('vote', ({ profile, vote, pollId, uid }) => {
    // Remove current vote
    app.locals.polls[pollId].options.forEach((option) => {
      delete option.profiles[uid]
    })

    // Place new vote
    app.locals.polls[pollId].options[vote].profiles[uid] = profile

    // Send out new poll object
    io.sockets.emit('returnNewPoll', app.locals.polls[pollId])
  })
})

server.listen(app.get('port'), () => {
  console.log(`Express server is running on ${app.get('port')}.`)
})

module.exports = { server, app }
