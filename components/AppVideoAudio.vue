<template>
  <div>
    <div id="video-div"></div>
    <button id="try-video-button">Video On</button>
    <button id="stop-video-button" disabled>Video Off</button>
  </div>
</template>
<script>
// import Twilio, {
//   connect,
//   createLocalTracks,
//   createLocalVideoTrack,
// } from 'twilio-video'
import Twilio from 'twilio-video'
export default {
  name: 'AppVideoAudio',
  methods: {
    async startVideo() {
      // const tryButton = document.getElementById('try-video-button')
      const stopButton = document.getElementById('stop-video-button')
      const container = document.getElementById('video-div')
      const track = await Twilio.Video.createLocalVideoTrack()
      container.append(track.attach())
      stopButton.addEventListener('click', function () {
        // stopVideo(track)
      })
    },
  },
}
</script>
