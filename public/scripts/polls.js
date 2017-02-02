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
})

socket.on('pollError', (err) => {
  console.log(err)
})

const showProfileInfo = (profile) => {
  $('.nickname').text(profile.nickname)
  $('.btn-login').hide()
  $('.avatar').attr('src', profile.photo).show()
  $('.btn-logout').show()
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
