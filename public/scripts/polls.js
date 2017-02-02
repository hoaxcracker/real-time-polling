localStorage.removeItem('currentPoll')

const socket = io()
const pollId = (window.location.href.substr(window.location.href.lastIndexOf('/') + 1))
const fullProfile = JSON.parse(localStorage.getItem('profile'))
const profile = {
  nickname: fullProfile.nickname,
  photo: fullProfile.picture,
  uid: fullProfile.user_id
}

socket.on('requestAuth', () => {
  console.log('you have connected')
  socket.emit('returnAuthRequestPoll', { profile, pollId })
})

socket.on('returnPoll', (poll) => {
  console.log('you have received a poll')
  console.log(poll)
  showPoll(poll)
})

socket.on('pollError', (err) => {
  console.log(err)
})

const showPoll = (poll) => {
  $('.poll-title').text(poll.title).show()
}

const showProfileInfo = (profile) => {
  $('.current-user-nickname').text(profile.nickname)
  $('.current-user-photo').attr('src', profile.photo).show()
}

$('.btn-logout').click((e) => {
  e.preventDefault()
  logout()
})

const logout = () => {
  localStorage.removeItem('idToken')
  window.location.href = '/'
}

showProfileInfo(profile)
