import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')

export default (_, inject) => {
  const echo = new Echo({
    broadcaster: process.env.BROADCAST_DRIVER,
    key: process.env.PUSHER_APP_KEY,
    cluster: process.env.PUSHER_APP_CLUSTER,
    wsHost: window.location.hostname,
    wsPort: window.location.port,
    disableStats: true,
    forceTLS: false,
  })

  inject('echo', echo)
}
