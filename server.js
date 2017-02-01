const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const shortid = require('shortid')
const path = require('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/polls/:poll_id', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/polls.html'))
})

app.get('/api/polls/:poll_id', (req, res) => {
  console.log(req.params.poll_id)
})

app.locals.polls = {}
app.post('/api/polls', (req, res) => {
  app.locals.polls[shortid()] = req.body
  res.json(app.locals.polls)
})

app.get('/api/polls', (req, res) => {
  res.json(app.locals.polls)
})

app.listen(app.get('port'), () => {
  console.log(`Express server is running on ${app.get('port')}.`)
})
