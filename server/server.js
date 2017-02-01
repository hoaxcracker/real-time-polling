const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const md5 = require('md5')
// const path = require('path')
// const environment = process.env.NODE_ENV || 'development'
// const configuration = require('../db/knexfile')[environment]
// const database = require('knex')(configuration)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.set('port', process.env.PORT || 3000)

app.post('/polls', (req, res) => {
  console.log(req.body)
})

app.get('/polls', (req, res) => {
  console.log(req.body)
})

app.listen(app.get('port'), () => {
  console.log(`Express server is running on ${app.get('port')}.`)
})
