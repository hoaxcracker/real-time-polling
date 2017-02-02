$(document).ready(() => {
  if (!localStorage.getItem('id_token')) {
    localStorage.setItem('currentPoll', window.location.pathname)
    window.location = '/login'
  }
})

$('.btn-logout').click((e) => {
  e.preventDefault()
  logout()
})

// retrieve the profile:

const showProfileInfo = (profile) => {
  $('.nickname').text(profile.nickname)
  $('.btn-login').hide()
  $('.avatar').attr('src', profile.picture).show()
  $('.btn-logout').show()
}

const logout = () => {
  localStorage.removeItem('idToken')
  window.location.href = '/'
}

const profile = JSON.parse(localStorage.getItem('profile'))

showProfileInfo(profile)

const fetchPoll = (pollId) => {
  fetch(`/api/polls/${pollId}`)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log('error: ', err))
}
