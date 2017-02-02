const socket = io()

socket.on('connected', (userCount) => {
  console.log('you have connected')
})

const profile = JSON.parse(localStorage.getItem('profile'))

const showProfileInfo = (profile) => {
  $('.nickname').text(profile.nickname)
  $('.btn-login').hide()
  $('.avatar').attr('src', profile.picture).show()
  $('.btn-logout').show()
}

showProfileInfo(profile)

// // Note: this may be a better job for web sockets

// // getPollId from url
//
// const fetchPoll = (pollId) => {
//   fetch(`/api/polls/${pollId}`)
//     .then(response => response.json())
//     .then(json => console.log(json))
//     .catch(err => console.log('error: ', err))
// }
//
// // fetchPoll(pollId)

$('.btn-logout').click((e) => {
  e.preventDefault()
  logout()
})

const logout = () => {
  localStorage.removeItem('idToken')
  window.location.href = '/'
}
