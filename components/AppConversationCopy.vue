<template>
  <div class="chat-container">
    <div>
      <div
        v-for="(msg, i) in messageList"
        :key="i"
        :class="{
          'message-section': true,
          'message-out': true,
          'message-in': false,
        }"
      >
        <span>{{ msg.body }}</span>
      </div>
    </div>
    <div class="chat-input">
      <AppInput v-model="message" style="width: 94%" />
      <AppButton
        class="send-button"
        icon="arrow-right"
        size="default"
        @click="sendMessageHandler"
      />
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import _ from 'lodash'
import moment from 'moment'
import Chat from 'twilio-chat'
import AppInput from '@/components/AppInput'
import AppButton from '@/components/AppButton'
export default {
  name: 'AppConversation',
  components: {
    AppInput,
    AppButton,
  },
  props: {
    doctor: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: 'patient',
    },
    currentCaseFile: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user.token.token
    return {
      activeClient: '',
      tc: {
        accessManager: null,
        messagingClient: null,
        channel: [],
        generalChannel: null,
        username: '',
        channelArray: [],
        currentChannel: null,
        activeChannelIndex: null,
        messagesArray: [],
      },
      username: '',
      connected: false,
      selected: false,
      showMessages: false,
      moment,
      message: null,
      userNotJoined: true,
      newChannel: '',
      showAddChannelInput: false,
      notification: false,
      notificationMsg: '',
      token,
      user,
    }
  },
  computed: {
    messageList() {
      if (this.allMessage) {
        return [...this.allMessage]
      }
      return []
    },
    ...mapState({
      // allMessage: (state) => state.messageModule.messageList,
    }),
  },
  watch: {
    chatDrawerIsVisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          // this.$echo
          //   .private(`message.${this.currentCaseFile.id}`)
          //   .listen('MessageSent', (e) => {
          //     console.log(e, '::: mounted ::')
          //   })
        }
      },
      immediate: true,
    },
  },
  created() {
    this.createChat(this.roomName)
  },
  // beforeDestroy() {
  //   this.$echo.leave(`message.${this.currentCaseFile.id}`)
  // },

  methods: {
    // Access token generation using username and room name
    async getAccessToken() {
      const config = {
        headers: { Authorization: `Bearer ${this.token}` },
      }
      console.log(this.user)
      if (this.status === 'doctor') {
        return await this.$axios.post(
          `start/conversation/${this.currentCaseFile.id}`,
          {
            identity: this.user.id,
            device: 'browser',
          },
          config
        )
      }
      return await this.$axios.post(
        `join/conversation/${this.currentCaseFile.id}`,
        this.currentCaseFile.id,
        config
      )
      //  Send chat - http://127.0.0.1:8000/api/create/conversation/2 (post request)

      // List chat - http://127.0.0.1:8000/api/list/conversation/2 (get request)
    },

    async sendMessageHandler() {
      if (!this.message) {
        return
      }
      try {
        const obj = {
          body: this.message,
          case_id: this.currentCaseFile.id,
        }
        await this.submitMessageHandler(obj)
        this.message = ''
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
        console.log(Chat.create, 'CHAT')
        Chat.create(token).then(function (client) {
          console.log(token, 'TOKEN')
          console.log(client, 'CLIENT')
          // set active room
          VueThis.tc.messagingClient = client
          VueThis.updateConnectedUI()
          VueThis.loadChannelList(VueThis.joinGeneralChannel)
          client.on('channelAdded', _.throttle(VueThis.loadChannelList))
          client.on('channelRemoved', _.throttle(VueThis.loadChannelList))
          client.on('tokenExpired', VueThis.getAccessToken)
        })
      })
    },
    updateConnectedUI() {
      this.connected = true
    },
    loadChannelList(handler) {
      if (this.tc.messagingClient === undefined) {
        console.log('Client is not initialized')
        return
      }
      this.getVisibleChannels(this.tc.messagingClient, handler)
    },

    getVisibleChannels(messagingClient, handler) {
      const vm = this

      messagingClient.getPublicChannelDescriptors().then(function (channels) {
        vm.tc.channelArray = vm.sortChannelsByName(channels.items)

        vm.tc.channelArray.forEach(vm.addChannel)
        if (typeof handler === 'function') {
          handler()
        }
      })
    },
    sortChannelsByName(channels) {
      return channels.sort(function (a, b) {
        if (a.friendlyName === 'general') {
          return -1
        }
        if (b.friendlyName === 'General Channel') {
          return 1
        }
        return a.friendlyName.localeCompare(b.friendlyName)
      })
    },
    joinGeneralChannel() {
      console.log('Attempting to join "general" chat channel...')
      const vm = this
      if (this.tc.generalChannel == null) {
        // If it doesn't exist, const's create it
        this.tc.messagingClient
          .createChannel({
            uniqueName: 'general',
            friendlyName: 'General Channel',
          })
          .then(function (channel) {
            console.log('Created general channel')
            vm.tc.generalChannel = channel
            vm.loadChannelList(vm.joinGeneralChannel)
          })
      } else {
        console.log('Found general channel:')
        this.setupChannel(this.tc.generalChannel)
      }
    },
    addChannel(channel) {
      if (channel.uniqueName === 'general') {
        this.tc.generalChannel = channel
      }
    },
    setupChannel(channel) {
      const vm = this
      return this.leaveCurrentChannel()
        .then(function () {
          return vm.initChannel(channel)
        })
        .then(function (_channel) {
          return vm.joinChannel(_channel)
        })
        .then(this.initChannelEvents)
    },
    leaveCurrentChannel() {
      const vm = this
      if (this.tc.currentChannel) {
        return this.tc.currentChannel.leave().then(function (leftChannel) {
          console.log('left ' + leftChannel.friendlyName)
          leftChannel.removeListener('messageAdded', vm.addMessageToList)
          leftChannel.removeListener('typingStarted', vm.showTypingStarted)
          leftChannel.removeListener('typingEnded', vm.hideTypingStarted)
          leftChannel.removeListener('memberJoined', vm.notifyMemberJoined)
          leftChannel.removeListener('memberLeft', vm.notifyMemberLeft)
        })
      } else {
        console.log('resolving')
        return Promise.resolve()
      }
    },
    initChannel(channel) {
      console.log('Initialized channel ' + channel.friendlyName)
      return this.tc.messagingClient.getChannelBySid(channel.sid)
    },
    initChannelEvents() {
      console.log(this.tc.currentChannel.friendlyName + ' ready.')
      this.tc.currentChannel.on('messageAdded', this.addMessageToList)
      this.tc.currentChannel.on('typingStarted', this.showTypingStarted)
      this.tc.currentChannel.on('typingEnded', this.hideTypingStarted)
      this.tc.currentChannel.on('memberJoined', this.notifyMemberJoined)
      this.tc.currentChannel.on('memberLeft', this.notifyMemberLeft)
      // $inputText.prop('disabled', false).focus();
    },
    showTypingStarted(member) {
      console.log(member.identity + ' is typing...')
      this.notificationMsg = member.identity + ' is typing...'
      this.notification = true
    },
    hideTypingStarted(member) {
      this.notificationMsg = ''
      this.notification = false
    },
    // notifyMemberJoined(member) {
    //   console.log('joining')
    //   console.log(member.identity + ' joined the channel')
    //   // notify(member.identity + ' joined the channel')
    // },
    // notifyMemberLeft(member) {
    //   console.log('leaving')
    //   console.log(member)
    //   console.log(member.identity + ' left the channel')
    //   // notify(member.identity + ' left the channel');
    // },
    // notify(message) {
    //   const row = $('<div>').addClass('col-md-12')
    //   row.loadTemplate('#member-notification-template', {
    //     status: message,
    //   })
    //   tc.$messageList.append(row)
    //   scrollToMessageListBottom()
    // },
    joinChannel(_channel) {
      console.log(_channel)
      const vm = this
      return _channel
        .join()
        .then(function (joinedChannel) {
          console.log('Joined channel ' + joinedChannel.friendlyName)
          vm.updateChannelUI(_channel)
          vm.tc.currentChannel = _channel
          vm.loadMessages()
          return joinedChannel
        })
        .catch(function (err) {
          alert(
            "Couldn't join channel " + _channel.friendlyName + ' because ' + err
          )
        })
    },
    updateChannelUI(selectedChannel) {
      const channelLists = this.$refs.channelList

      let activeChannelList = channelLists.filter(function (element) {
        return element.dataset.sid === selectedChannel.sid
      })

      activeChannelList = activeChannelList[0]
      if (
        this.tc.currentChannelContainer === undefined &&
        selectedChannel.uniqueName === 'general'
      ) {
        this.tc.currentChannelContainer = activeChannelList
      }

      this.tc.currentChannelContainer.classList.remove('selected-channel')
      this.tc.currentChannelContainer = activeChannelList
      this.tc.currentChannelContainer.classList.add('selected-channel')
    },
    loadMessages() {
      const vm = this
      this.tc.currentChannel.getMessages(50).then(function (messages) {
        vm.showMessages = true
        vm.tc.messagesArray = messages.items
        vm.userNotJoined = false
        // messages.items.forEach(vm.addMessageToList);
      })
    },
    addMessageToList(message) {
      console.log(message)
      this.loadMessages()
    },
    // handleInputTextKeypress() {
    //   const vm = this
    //   this.tc.currentChannel.sendMessage(this.message)
    //   this.message = ''
    //   // setTimeout(function(){
    //   //    vm.loadMessages();
    //   //  }, 3000);
    // },
    ...mapActions({
      submitMessageHandler: 'messageModule/POST_MESSAGE',
    }),
  },
}
</script>
<style lang="scss" scoped>
.send-button {
  width: 5%;
  font-size: 1.2rem;
  //   color: $dark-purple;
}
.chat-container {
  height: 100%;
  padding: 0.8rem 0;
  position: relative;
}
.chat-input {
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.message-section {
  //   width: fit-content;
  //   height: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  span {
    color: white;
    padding: 5px 16px;
    border-radius: 7.5px;
    max-width: 60%;
    position: relative;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    box-shadow: 0 2px 4.5px rgba(0, 0, 0, 0.18);
  }
}
.message-out {
  align-items: flex-end;
  span {
    background: $medium-purple;
  }
}
.message-in {
  align-items: flex-start;
  span {
    background: $medium-light;
  }
}
</style>
