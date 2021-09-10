export default function (ctx) {
  return {
    broadcaster: process.env.BROADCAST_DRIVER,
    key: process.env.PUSHER_APP_KEY,
    cluster: process.env.PUSHER_APP_CLUSTER,
    wsHost: window.location.hostname,
    wsPort: window.location.port,
    encrypted: true,
    disableStats: true,
    forceTLS: false,
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
