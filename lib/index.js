require('./styles/normalize.css')
require('./styles/styles.css')

const $ = require('jquery')
const fetch = require('isomorphic-fetch')

$('#create-poll-form').on('submit', (e) => {
  e.preventDefault()
  const $inputs = $('#create-poll-form :input').not(':button')
  const pollObject = structurePollObject($inputs)
  postNewPoll(pollObject)
})

const structurePollObject = ($inputs) => {
  let title = ''
  let options = []

  $inputs.each(function () {
    if (this.name === 'title') {
      title = $(this).val()
      $(this).val('')
      return
    }
    options.push($(this).val())
    $(this).val('')
  })

  return { title, options }
}

const postNewPoll = (pollObject) => {
  fetch('http://localhost:3000/polls', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pollObject)
  })
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.log(err))
}
