<template>
  <paystack
    :amount="nairaToKobo(userObj.amount)"
    :email="userObj.email"
    :firstname="userObj.first_name"
    :lastname="userObj.last_name"
    :paystackkey="paystackkey"
    :reference="reference"
    :callback="callback"
    :close="close"
    :embed="false"
  >
    <i class="fas fa-money-bill-alt"></i>
    {{ `Make Payment of &#8358;${userObj.amount}` }}
  </paystack>
</template>

<script type="text/javascript">
import paystack from 'vue-paystack'
export default {
  name: 'AppPayment',
  components: {
    paystack,
  },
  props: {
    userObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      paystackkey: 'pk_test_865f0ab325a43277245f7e7f352979ec21a39419',
    }
  },
  computed: {
    reference() {
      let text = ''
      const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))

      return text
    },
  },
  methods: {
    callback(response) {
      this.$emit('callback', response)
    },
    close() {
      this.$emit('close')
    },
    nairaToKobo(amount) {
      return (amount * 100).toFixed(0)
    },
  },
}
</script>
