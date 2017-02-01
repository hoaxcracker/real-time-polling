$(document).ready(() => {
  const pollId = window.location.href.substr(window.location.href.lastIndexOf('/') + 1)
  fetchPoll(pollId)
})

const fetchPoll = (pollId) => {
  fetch(`/api/polls/${pollId}`)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log('error: ', err))
}
