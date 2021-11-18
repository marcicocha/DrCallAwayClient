<template>
  <div>
    <div class="Video">
      <!-- <AppButton style="top: 5px; left: 5px" @click="showRoom(room_name)">
        CONNECT
      </AppButton> -->
      <div class="button-container">
        <AppButton :block="false" @click="audioHandler">
          <i v-if="microphone" class="fas fa-microphone"></i>
          <i v-else class="fas fa-microphone-slash"></i>
        </AppButton>
        <AppButton
          type="danger"
          :block="false"
          style="left: 1rem"
          @click="leaveRoomIfJoined(activeRoom)"
        >
          <i class="fas fa-phone-slash"></i>
        </AppButton>
      </div>
    </div>
    <div class="embed-responsive embed-responsive-16by9">
      <div class="row remote_video_container"></div>
      <div id="remoteTrack">
        <div v-if="!camera" class="name__tag">
          <span>{{ remoteUser }}</span>
        </div>
      </div>
      <div id="localTrack">
        <div v-if="!camera" class="name__tag">
          <span>{{ localUser }}</span>
        </div>
      </div>
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
    status: {
      type: String,
      default: 'patient',
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
      user,
    }
  },
  computed: {
    localUser() {
      const name = this.user.first_name
      return name.charAt(0)
    },
    remoteUser() {
      if (this.status === 'doctor') {
        const name = this.currentCaseFile.patient.first_name
        return name.charAt(0)
      }
      const name = this.currentCaseFile.doctor.first_name
      return name.charAt(0)
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
      if (this.status === 'doctor') {
        return await this.$axios.get(
          `start/call/${this.currentCaseFile.id}`,
          config
        )
      }
      return await this.$axios.get(
        `join/call/${this.currentCaseFile.id}`,
        config
      )
    },

    // Trigger log events
    dispatchLog(message) {
      // EventBus.$emit('new_log', message)
    },

    // // Attach the Tracks to the DOM OLD.
    // attachTracks(tracks, container) {
    //   tracks.forEach(function (track) {
    //     container.appendChild(track.attach())
    //   })
    // },

    // // Attach the Participant's Tracks to the DOM OLD.
    // attachParticipantTracks(participant, container) {
    //   const tracks = participant.tracks
    //   this.attachTracks(tracks, container)
    // },

    // Attach the Tracks to the DOM NEW.
    attachTracks(track, container) {
      container.appendChild(track.attach())
    },
    // Attach the Participant's Tracks to the DOM NEW.
    attachParticipantTracks(participant, container) {
      participant.tracks.forEach((part) => {
        if (part.isSubscribed) this.attachTracks(part.track, container)

        if (!part.isSubscribed)
          part.on('subscribed', (track) => {
            this.attachTracks(track, container)
          })
      })
    },
    // // Detach the Tracks from the DOM OLD.
    // detachTracks(tracks) {
    //   tracks.forEach((track) => {
    //     track.detach().forEach((detachedElement) => {
    //       detachedElement.remove()
    //     })
    //   })
    // },
    // // Detach the Participant's Tracks from the DOM OLD.
    // detachParticipantTracks(participant) {
    //   const tracks = Array.from(participant.tracks.values())
    //   this.detachTracks(tracks)
    // },

    // Detach the Tracks from the DOM NEW.
    detachTracks(tracks) {
      tracks.forEach((track) => {
        track.detach().forEach((detachedElement) => {
          detachedElement.remove()
        })
      })
    },

    // Detach the Participant's Tracks from the DOM NEW.
    detachParticipantTracks(participant) {
      participant.tracks.forEach((track) => {
        const previewContainer = document.getElementById('remoteTrack')
        while (previewContainer.firstChild) {
          previewContainer.removeChild(previewContainer.firstChild)
        }
        track.detach().forEach((detachedElement) => {
          detachedElement.remove()
        })
      })
    },
    // Leave Room.
    async leaveRoomIfJoined(activeRoom) {
      if (this.activeRoom) {
        try {
          const config = {
            headers: { Authorization: `Bearer ${this.token}` },
          }
          await this.$axios.$get(
            `/complete/call/${this.currentCaseFile.id}`,
            config
          )
          this.activeRoom.disconnect()
          this.$emit('close')
        } catch (err) {
          const { default: errorHandler } = await import('@/utils/errorHandler')
          errorHandler(err).forEach((msg) => {
            this.$notification.error({
              message: 'Error',
              description: msg,
              duration: 4000,
            })
          })
        }
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
    cameraHandler() {
      if (!this.camera) {
        this.activeRoom.localParticipant.videoTracks.forEach(function (
          videoTrack
        ) {
          console.log('videoTrack-- ' + videoTrack)
          videoTrack.track.disable()
        })
      } else {
        this.activeRoom.localParticipant.videoTracks.forEach(function (
          videoTrack
        ) {
          console.log('videoTrack-- ' + videoTrack)
          videoTrack.track.enable()
        })
      }
    },
    audioHandler() {
      if (this.microphone) {
        // mute audio of video chat
        this.activeRoom.localParticipant.audioTracks.forEach(function (
          audioTrack
        ) {
          console.log('audioTrack-- ' + audioTrack)
          audioTrack.track.disable()
        })
        this.microphone = false
      } else {
        // unmute audio of video chat
        this.activeRoom.localParticipant.audioTracks.forEach(function (
          audioTrack
        ) {
          console.log('audioTrack-- ' + audioTrack)
          audioTrack.track.enable()
        })
        this.microphone = true
      }
    },
    // Create a new chat
    createChat(name) {
      this.loading = true
      const VueThis = this
      this.getAccessToken().then((data) => {
        if (data.data.statusCode === 201) {
          VueThis.$notification.error({
            message: 'Error',
            description: data.data.message,
            duration: 4000,
          })
          this.$emit('close')
          return
        }
        const token = data.data.token
        VueThis.roomName = null
        const connectOptions = {
          name,
          audio: true,
          video: { width: '100%' },
        }
        // before a user enters a new room,
        // disconnect the user from they joined already
        VueThis.leaveRoomIfJoined()
        // remove any remote track when joining a new room
        document.getElementById('remoteTrack').innerHTML = ''
        Twilio.connect(token, connectOptions).then(function (room) {
          console.log(room, 'ROOM')
          // set active room
          VueThis.activeRoom = room
          VueThis.roomName = name
          VueThis.loading = false
          VueThis.cameraHandler()
          // Attach the Tracks of all the remote Participants.
          room.participants.forEach(function (participant) {
            const previewContainer = document.getElementById('remoteTrack')
            VueThis.attachParticipantTracks(participant, previewContainer)
          })
          // When a Participant joins the Room, log the event.
          room.on('participantConnected', function (participant) {
            VueThis.dispatchLog("Joining: '" + participant.identity + "'")
            const previewContainer = document.getElementById('remoteTrack')
            VueThis.attachParticipantTracks(participant, previewContainer)
            participant.on('trackPublished', (track) => {
              previewContainer.appendChild(track.attach())
            })
          })

          // When a Participant adds a Track, attach it to the DOM.
          room.on('trackPublished', (track, participant) => {
            VueThis.dispatchLog(participant.identity + ' enabled ' + track.kind)
            const previewContainer = document.getElementById('remoteTrack')
            VueThis.attachTracks([track], previewContainer)
          })
          // // When a Participant adds a Track, attach it to the DOM.
          // room.on('trackAdded', function (track, participant) {
          //   VueThis.dispatchLog(participant.identity + ' enabled ' + track.kind)
          //   const previewContainer = document.getElementById('remoteTrack')
          //   VueThis.attachTracks([track], previewContainer)
          // })
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
          room.once('disconnected', (room) => {
            room.localParticipant.tracks.forEach((track) => {
              track.track.stop()
              const attachedElements = track.track.detach()
              attachedElements.forEach((element) => element.remove())
              room.localParticipant.videoTracks.forEach((video) => {
                const trackConst = [video][0].track
                trackConst.stop()

                trackConst.detach().forEach((element) => element.remove())

                room.localParticipant.unpublishTrack(trackConst)
              })

              const previewContainer = document.getElementById('remoteTrack')
              while (previewContainer.firstChild) {
                previewContainer.removeChild(previewContainer.firstChild)
              }
              // const localMediaContainer = document.getElementById('localTrack')
              // while (localMediaContainer.firstChild) {
              //   localMediaContainer.removeChild(localMediaContainer.firstChild)
              // }
              // setTimeout(() => {
              //   window.location.reload()
              // }, 1000)
            })
          })
          // if local preview is not active, create it
          if (VueThis.camera) {
            createLocalVideoTrack().then((track) => {
              const localMediaContainer = document.getElementById('localT rack')
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

<style lang="scss" scoped>
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
  width: 100% !important;
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
  // padding: 4px;
  color: rgb(3, 11, 19);
}
.col-md-10 {
  background-color: lightgray;
  height: auto;
}
.button-container {
  display: flex;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 200000;
}
#remoteTrack {
  video {
    width: 100% !important;
  }
  .name__tag {
    span {
      font-size: 4rem;
      background: $dark-purple;
    }
  }
}
#localTrack {
  position: absolute;
  bottom: 0;
  right: 0;
  min-width: 200px;
  min-height: 150px;
  background: $dark-purple;
  video {
    width: 200px !important;
  }
  .name__tag {
    span {
      background: $purple;
    }
  }
}
.name__tag {
  z-index: 20;
  display: block;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  // width: 5rem;
  // height: 5rem;
  span {
    text-transform: uppercase;
    font-size: 3rem;
    color: #fff;
    padding: 1rem;
    border-radius: 50%;
  }
}
</style>
