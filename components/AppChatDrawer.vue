<template>
  <a-drawer
    width="60%"
    placement="right"
    :closable="true"
    :visible="chatDrawerIsVisible"
    class="chat-drawer"
    @close="onClose"
  >
    <chat-window
      :current-user-id="user.id"
      :room-id="currentCaseFile.case_id"
      :rooms="rooms"
      :messages="messages"
      :rooms-loaded="roomsLoaded"
      :loading-rooms="loadingRooms"
      :single-room="true"
      height="100%"
      @send-message="sendMessage"
      @send-message-reaction="sendMessageReaction"
      @edit-message="editMessage"
      @delete-message="deleteMessage"
      @fetch-messages="fetchMessages"
      @open-file="openFile"
    />
  </a-drawer>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ChatWindow from 'vue-advanced-chat'
// import { storage, firestore } from '~/plugins/firebase.js'
import * as storage from '~/plugins/storage.js'
import * as firestore from '~/plugins/firestore.js'
import { parseTimestamp } from '@/utils/dates'
// import * as firebaseService from '~/plugins/firebase'
import 'vue-advanced-chat/dist/vue-advanced-chat.css'

export default {
  components: {
    ChatWindow,
  },
  props: {
    chatDrawerIsVisible: {
      type: Boolean,
      default: false,
    },
    doctor: {
      type: String,
      default: '',
    },
    currentCaseFile: {
      type: Object,
      default: () => {},
    },
    status: {
      type: String,
      default: 'patient',
    },
  },
  data() {
    const user = JSON.parse(localStorage.getItem('user'))

    return {
      messages: [],
      user,
      listeners: [],
      lastLoadedMessage: null,
      previousLastLoadedMessage: null,
      messagesPerPage: 20,
      messagesLoaded: false,
      roomsLoaded: false,
      loadingRooms: false,
    }
  },
  computed: {
    rooms() {
      if (this.status === 'patient') {
        return [
          {
            roomId: this.currentCaseFile.case_id,
            roomName: this.currentCaseFile.doctor.first_name,
            avatar: this.currentCaseFile.doctor.profile_pic,
            unreadCount: 4,
            index: 3,
            lastMessage: {
              content: 'Last message received',
              senderId: 1234,
              username: 'John Doe',
              timestamp: '10:20',
              saved: true,
              distributed: false,
              seen: false,
              new: true,
            },
            users: [
              {
                _id: this.user.id,
                username: this.user.first_name,
                avatar: this.user.profile_pic,
                status: {
                  state: 'online',
                  lastChanged: 'today, 14:30',
                },
              },
              {
                _id: this.currentCaseFile.doctor.id,
                username: this.currentCaseFile.doctor.first_name,
                avatar: this.currentCaseFile.doctor.profile_pic,
                status: {
                  state: 'offline',
                  lastChanged: '14 July, 20:00',
                },
              },
            ],
            typingUsers: [this.currentCaseFile.doctor.id],
          },
        ]
      }
      return [
        {
          roomId: this.currentCaseFile.case_id,
          roomName: this.currentCaseFile.patient.first_name,
          avatar: this.currentCaseFile.patient.profile_pic,
          unreadCount: 4,
          index: 3,
          lastMessage: {
            content: 'Last message received',
            senderId: 1234,
            username: 'John Doe',
            timestamp: '10:20',
            saved: true,
            distributed: false,
            seen: false,
            new: true,
          },
          users: [
            {
              _id: this.user.id,
              username: this.user.firstName,
              avatar: this.user.profile_pic,
              status: {
                state: 'online',
                lastChanged: 'today, 14:30',
              },
            },
            {
              _id: this.currentCaseFile.patient.id,
              username: this.currentCaseFile.patient.firstName,
              avatar: this.currentCaseFile.patient.profile_pic,
              status: {
                state: 'offline',
                lastChanged: '14 July, 20:00',
              },
            },
          ],
          typingUsers: [this.currentCaseFile.patient.id],
        },
      ]
    },
    messageList() {
      if (this.allMessage) {
        const newArray = this.allMessage.map((rcd) => {
          if (rcd.sender_id === this.user.id) {
            return { ...rcd, isSender: true }
          } else {
            return { ...rcd, isSender: false }
          }
        })
        return [...newArray]
      }
      return []
    },

    ...mapState({
      allMessage: (state) => state.messageModule.messageList,
    }),
  },
  methods: {
    onClose() {
      this.$emit('onClose')
      this.resetMessageHandler()
    },
    resetMessages() {
      this.messages = []
      this.messagesLoaded = false
      this.lastLoadedMessage = null
      this.previousLastLoadedMessage = null
      this.listeners.forEach((listener) => listener())
      this.listeners = []
    },
    listenMessages(messages, room) {
      messages.forEach((message) => {
        const formattedMessage = this.formatMessage(room, message)
        const messageIndex = this.messages.findIndex(
          (m) => m._id === message.id
        )
        if (messageIndex === -1) {
          this.messages = this.messages.concat([formattedMessage])
        } else {
          this.messages[messageIndex] = formattedMessage
          this.messages = [...this.messages]
        }
        this.markMessagesSeen(room, message)
      })
    },
    markMessagesSeen(room, message) {
      if (
        message.data().sender_id !== this.user.id &&
        (!message.data().seen || !message.data().seen[this.user.id])
      ) {
        firestore.updateMessage(room.roomId, message.id, {
          [`seen.${this.user.id}`]: new Date(),
        })
      }
    },
    // listenUsersOnlineStatus(rooms) {
    //   rooms.forEach((room) => {
    //     room.users.forEach((user) => {
    //       const listener = firebaseService.firebaseListener(
    //         firebaseService.userStatusRef(user._id),
    //         (snapshot) => {
    //           if (!snapshot || !snapshot.val()) return
    //           const lastChanged = formatTimestamp(
    //             new Date(snapshot.val().lastChanged),
    //             new Date(snapshot.val().lastChanged)
    //           )
    //           user.status = { ...snapshot.val(), lastChanged }
    //           const roomIndex = this.rooms.findIndex(
    //             (r) => room.roomId === r.roomId
    //           )
    //           this.rooms[roomIndex] = room
    //           this.rooms = [...this.rooms]
    //         }
    //       )
    //       this.roomsListeners.push(listener)
    //     })
    //   })
    // },
    formatMessage(room, message) {
      const { timestamp } = message.data()
      const formattedMessage = {
        ...message.data(),
        ...{
          senderId: message.data().sender_id,
          _id: message.id,
          seconds: timestamp.seconds,
          timestamp: parseTimestamp(timestamp, 'HH:mm'),
          date: parseTimestamp(timestamp, 'DD MMMM YYYY'),
          username: room.users.find(
            (user) => message.data().sender_id === user._id
          )?.username,
          // avatar: senderUser ? senderUser.avatar : null,
          distributed: true,
        },
      }
      if (message.data().replyMessage) {
        formattedMessage.replyMessage = {
          ...message.data().replyMessage,
          ...{
            senderId: message.data().replyMessage.sender_id,
          },
        }
      }
      return formattedMessage
    },
    fetchMessages({ room, options = {} }) {
      this.$emit('show-demo-options', false)
      if (options.reset) {
        this.resetMessages()
        this.roomId = room.roomId
      }
      if (this.previousLastLoadedMessage && !this.lastLoadedMessage) {
        this.messagesLoaded = true
        return
      }
      this.selectedRoom = room.roomId
      firestore
        .getMessages(room.roomId, this.messagesPerPage, this.lastLoadedMessage)
        .then((messages) => {
          // this.incrementDbCounter('Fetch Room Messages', messages.size)
          if (this.selectedRoom !== room.roomId) return
          if (messages.empty || messages.docs.length < this.messagesPerPage) {
            setTimeout(() => (this.messagesLoaded = true), 0)
          }
          if (options.reset) this.messages = []
          messages.forEach((message) => {
            const formattedMessage = this.formatMessage(room, message)
            this.messages.unshift(formattedMessage)
          })
          if (this.lastLoadedMessage) {
            this.previousLastLoadedMessage = this.lastLoadedMessage
          }
          this.lastLoadedMessage = messages.docs[messages.docs.length - 1]
          const listener = firestore.firestoreListener(
            firestore.paginatedMessagesQuery(
              room.roomId,
              this.lastLoadedMessage,
              this.previousLastLoadedMessage
            ),
            (snapshots) => {
              // this.incrementDbCounter('Listen Room Messages', snapshots.size)
              this.listenMessages(snapshots, room)
            }
          )
          this.listeners.push(listener)
        })
    },
    typingMessage({ message, roomId }) {
      if (roomId) {
        if (message?.length > 1) {
          this.typingMessageCache = message
          return
        }
        if (message?.length === 1 && this.typingMessageCache) {
          this.typingMessageCache = message
          return
        }
        this.typingMessageCache = message
        firestore.updateRoomTypingUsers(
          roomId,
          this.user.id,
          message ? 'add' : 'remove'
        )
      }
    },

    openFile({ file }) {
      window.open(file.file.url, '_blank')
    },
    async editMessage({ messageId, newContent, roomId, files }) {
      const newMessage = { edited: new Date() }
      newMessage.content = newContent
      if (files) {
        newMessage.files = this.formattedFiles(files)
      } else {
        newMessage.files = firestore.deleteDbField
      }
      await firestore.updateMessage(roomId, messageId, newMessage)
      if (files) {
        for (let index = 0; index < files.length; index++) {
          if (files[index]?.blob) {
            await this.uploadFile({ file: files[index], messageId, roomId })
          }
        }
      }
    },
    async deleteMessage({ message, roomId }) {
      await firestore.updateMessage(roomId, message._id, {
        deleted: new Date(),
      })
      const { files } = message
      if (files) {
        files.forEach((file) => {
          storage.deleteFile(this.user.id, message._id, file)
        })
      }
    },
    sendMessageReaction({ reaction, remove, messageId, roomId }) {
      firestore.updateMessageReactions(
        roomId,
        messageId,
        this.user.id,
        reaction.unicode,
        remove ? 'remove' : 'add'
      )
    },
    formattedFiles(files) {
      const formattedFiles = []
      files.forEach((file) => {
        const messageFile = {
          name: file.name,
          size: file.size,
          type: file.type,
          extension: file.extension || file.type,
          url: file.url || file.localUrl,
        }
        if (file.audio) {
          messageFile.audio = true
          messageFile.duration = file.duration
        }
        formattedFiles.push(messageFile)
      })
      return formattedFiles
    },
    uploadFile({ file, messageId, roomId }) {
      return new Promise((resolve) => {
        let type = file.extension || file.type
        if (type === 'svg' || type === 'pdf') {
          type = file.type
        }
        const uploadTask = storage.uploadFileTask(
          this.user.id,
          messageId,
          file,
          type
        )
        uploadTask.on(
          'state_changed',
          (snap) => {
            const progress = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            )
            this.updateFileProgress(messageId, file.localUrl, progress)
          },
          (_error) => {
            resolve(false)
          },
          async () => {
            const url = await storage.getFileDownloadUrl(
              uploadTask.snapshot.ref
            )
            const messageDoc = await firestore.getMessage(roomId, messageId)
            const files = messageDoc.data().files
            files.forEach((f) => {
              if (f.url === file.localUrl) {
                f.url = url
              }
            })
            await firestore.updateMessage(roomId, messageId, { files })
            resolve(true)
          }
        )
      })
    },
    updateFileProgress(messageId, fileUrl, progress) {
      const message = this.messages.find((message) => message._id === messageId)
      if (!message || !message.files) return
      message.files.find((file) => file.url === fileUrl).progress = progress
      this.messages = [...this.messages]
    },
    async sendMessage({ content, roomId, files, replyMessage }) {
      const message = {
        sender_id: this.user.id,
        content,
        timestamp: new Date(),
      }
      if (files) {
        message.files = this.formattedFiles(files)
      }
      if (replyMessage) {
        message.replyMessage = {
          _id: replyMessage._id,
          content: replyMessage.content,
          sender_id: replyMessage.senderId,
        }
        if (replyMessage.files) {
          message.replyMessage.files = replyMessage.files
        }
      }
      const { id } = await firestore.addMessage(roomId, message)
      // const obj = {
      //   body: this.content,
      //   case_id: this.currentCaseFile.id,
      // }
      // await this.submitMessageHandler(obj)
      if (files) {
        for (let index = 0; index < files.length; index++) {
          await this.uploadFile({ file: files[index], messageId: id, roomId })
        }
      }
      firestore.updateRoom(roomId, { lastUpdated: new Date() })
    },
    ...mapActions({
      submitMessageHandler: 'messageModule/POST_MESSAGE',
      resetMessageHandler: 'messageModule/RESET_MESSAGE',
    }),
  },
}
</script>
