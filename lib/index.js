require('./styles/normalize.css')
require('./styles/styles.css')
const $ = require('jquery')

$('#create-poll-form').on('submit', () => {
  console.log('ping')
})
