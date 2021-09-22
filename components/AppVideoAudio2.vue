<template>
  <div>
    <div class="Video">
      <!-- <AppButton style="top: 5px; left: 5px" @click="showRoom(room_name)">
        CONNECT
      </AppButton> -->
      <AppButton
        style="top: 5px; left: 5px"
        :block="false"
        @click="audioHandler"
      >
        <i v-if="microphone" class="fas fa-microphone"></i>
        <i v-else class="fas fa-microphone-slash"></i>
      </AppButton>
      <AppButton
        type="danger"
        :block="false"
        style="top: 5px; left: 5px"
        @click="leaveRoomIfJoined(activeRoom)"
      >
        <i class="fas fa-phone-slash"></i>
      </AppButton>
    </div>
    <div class="embed-responsive embed-responsive-16by9">
      <div class="row remote_video_container"></div>
      <div id="remoteTrack"></div>
      <div id="localTrack"></div>
    </div>
  </div>
</template>

<script>
// import { EventBus } from '../Event'
import Twilio, { createLocalVideoTrack } from 'twilio-video'
//  connect,
//  createLocalTracks,
import AppButton from '@/components/AppButton'
export default {
  name: 'VideoChat',
  components: {
    AppButton,
  },
  props: {
    username: {
      type: String,
      default: '',
    },
    currentCaseFile: {
      type: Object,
      default: () => {},
    },
    camera: {
      type: Boolean,
      default: false,
    },
    // roomName: {
    //   type: String,
    //   default: '',
    // },
  },
  data() {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user.token.token
    return {
      loading: false,
      data: {},
      localTrack: false,
      remoteTrack: '',
      activeRoom: '',
      previewTracks: '',
      identity: '',
      roomName: null,
      microphone: true,
      token,
    }
  },
  watch: {
    camera: {
      handler(newCamera) {
        if (!newCamera) {
          this.activeRoom.localParticipant.videoTracks.forEach(function (
            videoTrack
          ) {
            console.log('videoTrack-- ' + videoTrack)
            videoTrack.disable()
          })
        } else {
          this.activeRoom.localParticipant.videoTracks.forEach(function (
            videoTrack
          ) {
            console.log('videoTrack-- ' + videoTrack)
            videoTrack.enable()
          })
        }
      },
    },
  },
  created() {
    this.createChat(this.roomName)
  },
  methods: {
    // Access token generation using username and room name
    async getAccessToken() {
      const config = {
        headers: { Authorization: `Bearer ${this.token}` },
      }
      return await this.$axios.get(
        `start/call/${this.currentCaseFile.id}`,
        config
      )
    },

    // Trigger log events
    dispatchLog(message) {
      // EventBus.$emit('new_log', message)
    },

    // Attach the Tracks to the DOM.
    attachTracks(tracks, container) {
      tracks.forEach(function (track) {
        container.appendChild(track.attach())
      })
    },

    // Attach the Participant's Tracks to the DOM.
    attachParticipantTracks(participant, container) {
      const tracks = Array.from(participant.tracks.values())
      this.attachTracks(tracks, container)
    },

    // Detach the Tracks from the DOM.
    detachTracks(tracks) {
      tracks.forEach((track) => {
        track.detach().forEach((detachedElement) => {
          detachedElement.remove()
        })
      })
    },
    // Detach the Participant's Tracks from the DOM.
    detachParticipantTracks(participant) {
      const tracks = Array.from(participant.tracks.values())
      this.detachTracks(tracks)
    },
    // Leave Room.
    leaveRoomIfJoined(activeRoom) {
      if (this.activeRoom) {
        this.activeRoom.disconnect()
        console.log('Left the room: ')
      }
    },
    // Click connect AppButton
    showRoom(room) {
      this.room_name = room
      this.createChat(this.room_name)
      window.addEventListener('beforeunload', this.leaveRoomIfJoined)
      this.startDate = new Date()
      console.log('start date', this.startDate)
    },

    audioHandler() {
      if (this.microphone) {
        // mute audio of video chat
        this.activeRoom.localParticipant.audioTracks.forEach(function (
          audioTrack
        ) {
          console.log('audioTrack-- ' + audioTrack)
          audioTrack.disable()
        })
        this.microphone = false
      } else {
        // unmute audio of video chat
        this.activeRoom.localParticipant.audioTracks.forEach(function (
          audioTrack
        ) {
          console.log('audioTrack-- ' + audioTrack)
          audioTrack.enable()
        })
        this.microphone = true
      }
    },
    // Create a new chat
    createChat(name) {
      this.loading = true
      const VueThis = this
      this.getAccessToken().then((data) => {
        console.log(data, 'DATA')
        const token = data.data.token

        VueThis.roomName = null
        const connectOptions = {
          name,
          audio: true,
          video: { width: 600 },
        }
        // before a user enters a new room,
        // disconnect the user from they joined already
        this.leaveRoomIfJoined()
        // remove any remote track when joining a new room
        document.getElementById('remoteTrack').innerHTML = ''
        Twilio.connect(token, connectOptions).then(function (room) {
          // set active room
          VueThis.activeRoom = room
          VueThis.roomName = name
          VueThis.loading = false
          // Attach the Tracks of all the remote Participants.
          room.participants.forEach(function (participant) {
            const previewContainer = document.getElementById('remoteTrack')
            VueThis.attachParticipantTracks(participant, previewContainer)
          })
          // When a Participant joins the Room, log the event.
          room.on('participantConnected', function (participant) {
            VueThis.dispatchLog("Joining: '" + participant.identity + "'")
          })
          // When a Participant adds a Track, attach it to the DOM.
          room.on('trackAdded', function (track, participant) {
            VueThis.dispatchLog(participant.identity + ' enabled ' + track.kind)
            const previewContainer = document.getElementById('remoteTrack')
            VueThis.attachTracks([track], previewContainer)
          })
          // When a Participant removes a Track, detach it from the DOM.
          room.on('trackRemoved', function (track, participant) {
            VueThis.dispatchLog(
              participant.identity + ' disabled ' + track.kind
            )
            VueThis.detachTracks([track])
            console.log('detach participant track from the DOM')
          })
          // When a Participant leaves the Room, detach its Tracks.
          room.on('participantDisconnected', function (participant) {
            VueThis.dispatchLog(participant.identity + ' left the room')
            VueThis.detachParticipantTracks(participant)
          })
          // if local preview is not active, create it
          if (!VueThis.localTrack) {
            createLocalVideoTrack().then((track) => {
              const localMediaContainer = document.getElementById('localTrack')
              localMediaContainer.appendChild(track.attach())
              VueThis.localTrack = true
            })
          }
        })
      })
    },
  },
}
</script>

<style>
.remote_video_container {
  left: 0;
  margin: 0;
  max-width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
  position: absolute;
}
#video {
  width: 100px !important;
  background-repeat: no-repeat;
  height: 100px;
  position: absolute;
  z-index: 2;
}
.spacing {
  padding: 20px;
  width: 100%;
}
.Video {
  padding: 4px;
  color: rgb(3, 11, 19);
}
.col-md-10 {
  background-color: lightgray;
  height: auto;
}
</style>
