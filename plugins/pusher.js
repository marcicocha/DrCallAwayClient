const Pusher = require('pusher')
const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
  key: process.env.PUSHER_APP_KEY,
  cluster: process.env.PUSHER_APP_CLUSTER,
  secret: process.env.PUSHER_APP_SECRET,
  app_id: process.env.PUSHER_APP_ID,
})
export default pusher
