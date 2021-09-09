export default function (ctx) {
  return {
    broadcaster: process.env.BROADCAST_DRIVER,
    // authModule: true,
    // disconnectOnLogout: true,
    forceTLS: false,
    disableStats: true,
    // authEndpoint: 'http://cheermeapp.test/api/broadcasting/auth',
    key: process.env.PUSHER_APP_KEY,
    cluster: process.env.PUSHER_APP_CLUSTER,
    // secret: process.env.PUSHER_APP_SECRET,
    // app_id: process.env.PUSHER_APP_ID,
    wsHost: window.location.hostname,
    wsPort: '8080',
    // authorizer: (channel) => ({
    //   authorize: (socketId, authorizerCallback) =>
    //     ctx.app.$axios
    //       .$post('/api/broadcasting/auth', {
    //         channel_name: channel.name,
    //         socket_id: socketId,
    //       })
    //       .then(({ data }) => authorizerCallback(false, data))
    //       .catch((error) => authorizerCallback(true, error)),
    // }),
  }
}
