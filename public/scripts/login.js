$(document).ready(() => {
  var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
    auth: {
      params: { scope: 'openid email' } // Details: https://auth0.com/docs/scopes
    }
  })

  lock.show()

  lock.on('authenticated', (authResult) => {
    lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        // Handle error
        return
      }
      localStorage.setItem('id_token', authResult.idToken)
      localStorage.setItem('profile', JSON.stringify(profile))

      window.location = localStorage.getItem('currentPoll')
    })
  })
})
