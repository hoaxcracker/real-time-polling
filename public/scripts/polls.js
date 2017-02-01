$(document).ready(() => {
  if (!localStorage.getItem('id_token')) {
    localStorage.setItem('currentPoll', window.location.pathname);
    window.location = '/login'
  }
})

// $(document).ready(() => {
//   authenticateUser()
//   const pollId = window.location.href.substr(window.location.href.lastIndexOf('/') + 1)
//   fetchPoll(pollId)
// })

const authenticateUser = () => {
  const lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
    auth: {
      redirectUrl: window.location.origin + '/login',
      responseType: 'token',
      params: {
        state: JSON.stringify({pathname: window.location.pathname})
      }
    }
  })

  lock.show()

  $('.btn-logout').click((e) => {
    e.preventDefault()
    logout()
  })

  lock.on('authenticated', (authResult) => {
    lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        // Handle error
        return
      }
      localStorage.setItem('idToken', authResult.idToken)
      // Display user information
      showProfileInfo(profile)
    })
  })

  // retrieve the profile:
  const retrieveProfile = () => {
    const idToken = localStorage.getItem('idToken')
    if (idToken) {
      lock.getProfile(idToken, (err, profile) => {
        if (err) {
          return alert('There was an error getting the profile: ' + err.message)
        }
      // Display user information
        showProfileInfo(profile)
      })
    }
  }

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

  retrieveProfile()
}

const profile = JSON.parse(localStorage.getItem('profile'))

const showProfileInfo = (profile) => {
  $('.nickname').text(profile.nickname)
  $('.btn-login').hide()
  $('.avatar').attr('src', profile.picture).show()
  $('.btn-logout').show()
}

showProfileInfo(profile)

const fetchPoll = (pollId) => {
  fetch(`/api/polls/${pollId}`)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log('error: ', err))
}
