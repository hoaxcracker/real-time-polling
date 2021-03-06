$(document).ready(() => {
  fetchPolls()
})

const fetchPolls = () => {
  fetch('http://localhost:3000/api/polls')
    .then(response => response.json())
    .then(json => renderPolls(json))
    .catch(err => console.log('error: ', err))
}

$('#create-poll-form').on('submit', (e) => {
  e.preventDefault()
  const $inputs = $('#create-poll-form :input').not(':button')
  const pollObject = structurePollObject($inputs)
  $('#additional-options').empty()
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
    options.push({
      text: $(this).val(),
      profiles: {}
    })
    $(this).val('')
  })

  return { title, options }
}

const postNewPoll = (pollObject) => {
  fetch('http://localhost:3000/api/polls', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pollObject)
  })
    .then(response => response.json())
    .then(json => renderPolls(json))
    .catch(err => console.log('error: ', err))
}

const renderPolls = (polls) => {
  let phtml = Object.keys(polls).reduce((pollsHTML, pollId) => {
    return pollsHTML + pollToHTML(polls, pollId)
  }, '')

  $('#polls-list').html(phtml)
}

const pollToHTML = (polls, pollId) => (`
    <article class="poll-link">
      <a href="http://localhost:3000/polls/${pollId}">
        <h4>${polls[pollId].title}</h4>
      </a>
    </article>
  `)

let optionCount = 2
$('#add-poll-option-button').on('click', () => {
  ++optionCount
  $('#additional-options').append(`
    <p>
      <label for="option${optionCount}-input">Option ${optionCount}:</label>
      <input type="text" placeholder="Other option..." name="option${optionCount}" required/>
    </p>
  `)
})
