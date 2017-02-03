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
  socket.emit('returnAuthRequestPoll', { profile, pollId })
})

socket.on('returnInitialPoll', (poll) => {
  showPoll(poll)
})

socket.on('returnNewPoll', (poll) => {
  showPoll(poll)
})

socket.on('returnErr', (err) => {
  alert(err)
})

const showProfileInfo = (profile) => {
  $('.current-user-nickname').text(profile.nickname)
  $('.current-user-photo').attr('src', profile.photo).show()
}

const showPoll = (poll) => {
  $('.poll-title').text(poll.title).show()
  $('main').html(poll.options.map((option, i) => (
    pollOptionToHTML(option, i)
  )))
}

const pollOptionToHTML = (option, i) => (`
  <article>
    <section>
      <h4>${i + 1} : ${option.text}</h4>
      <section class='vote-tally'>
        <span class='flex-align'>
          <h4>Votes : ${Object.keys(option.profiles).length}</h4>
          <button class='btn-vote' id='${i}'>Vote</button>
        </span>
      </section>
    </section>
    <section class='user-icons'>
      ${Object.keys(option.profiles).reduce((html, profile) => (
        `${html}<img src='${option.profiles[profile].photo}'/>`
      ), '')}
    </section>
  </article>
`)

$('main').on('click', '.btn-vote', (e) => {
  e.preventDefault()
  socket.emit('vote', {
    profile,
    uid: profile.uid,
    vote: e.target.id,
    pollId
  })
})

$('.btn-logout').click((e) => {
  e.preventDefault()
  logout()
})

const logout = () => {
  localStorage.removeItem('profile')
  localStorage.removeItem('id_token')
  window.location.href = '/'
}

showProfileInfo(profile)
