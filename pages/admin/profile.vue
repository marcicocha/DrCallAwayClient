<template>
  <div>
    <p class="page_heading">Profile Information</p>
    <div class="admin-wrapper">
      <p>Profile Wrapper</p>
      <figure>
        <img src="" />
      </figure>

      <br />
      <div>
        <ValidationObserver ref="observer" tag="div">
          <AppTabs v-model="activeKey">
            <template slot="default">
              <a-tab-pane key="1" tab="Personal Information" force-render>
                <a-row type="flex" :gutter="24">
                  <a-col v-if="!isRegisteredName" :span="12">
                    <AppInput
                      v-model="profileObj.first_name"
                      label="First Name"
                      name="First Name"
                      rules="required"
                      required
                    />
                  </a-col>
                  <a-col v-if="!isRegisteredName" :span="12">
                    <AppInput
                      v-model="profileObj.last_name"
                      label="Last Name"
                      name="Last Name"
                      rules="required"
                      required
                    />
                  </a-col>
                  <a-col v-if="isRegisteredName" :span="12">
                    <AppInput
                      v-model="profileObj.registered_name"
                      label="Registered Name"
                      name="Registered Name"
                      rules="required"
                      required
                    />
                  </a-col>
                  <a-col v-if="isRegisteredName" :span="12">
                    <AppInput
                      v-model="profileObj.rc_number"
                      label="RC Number"
                      name="RC Number"
                      rules="required"
                      required
                    />
                  </a-col>
                  <a-col :span="role !== 'patient' ? 12 : 24">
                    <AppInput
                      v-model="profileObj.address"
                      label="Address"
                      name="Address"
                      rules="required"
                      required
                    />
                  </a-col>
                  <a-col v-if="role !== 'patient'" :span="12"> </a-col>
                  <a-col :span="12">
                    <AppSelect
                      v-model="profileObj.state"
                      label="State"
                      placeholder="State"
                      name="state"
                      url="/states"
                      :call-back-func="
                        (resp) => ({
                          text: resp,
                          value: resp,
                        })
                      "
                      @change="selectStateHandler"
                    />
                  </a-col>
                  <a-col :span="12">
                    <AppSelect
                      :key="counter"
                      v-model="profileObj.city"
                      label="LGA"
                      placeholder="Select LGA"
                      name="LGA"
                      :url="`/lgas/${profileObj.state}`"
                      :call-back-func="
                        (resp) => ({
                          text: resp,
                          value: resp,
                        })
                      "
                    />
                  </a-col>
                  <a-col :span="12">
                    <AppInput
                      v-model="profileObj.mobile_phone_number"
                      label="Phone Number"
                      name="Phone Number"
                      rules="required"
                      required
                      is-number
                    />
                  </a-col>
                  <a-col :span="12">
                    <AppInput
                      v-model="profileObj.alternate_mobile_phone_number"
                      label="Alternate Phone Number"
                      name="Alternate Phone Number"
                      is-number
                    />
                  </a-col>
                  <a-col :span="12">
                    <AppInput
                      v-model="profileObj.email"
                      label="Email"
                      name="Email"
                      rules="required"
                      required
                    />
                  </a-col>
                  <a-col v-if="role === 'diagnostic'" :span="12">
                    <AppInput
                      v-model="profileObj.nmcn_license_no"
                      label="Licence Number"
                      name="Licence Number"
                      rules="required"
                      required
                      :max-length="20"
                    />
                  </a-col>
                  <a-col v-if="!isRegisteredName" :span="12">
                    <AppDatePicker
                      v-model="profileObj.dob"
                      label="Date of Birth"
                      name="Date of Birth"
                      rules="required"
                      required
                    />
                  </a-col>
                </a-row>
                <a-row
                  v-if="role !== 'patient' && !isRegisteredName"
                  type="flex"
                  :gutter="24"
                >
                  <a-col :span="12">
                    <AppInput
                      v-model="profileObj.nursing_school_attended"
                      label="Medical School Attended"
                      name="Medical School Attended"
                      rules="required"
                      required
                    />
                  </a-col>
                  <a-col :span="12">
                    <AppInput
                      v-model="profileObj.nmcn_license_no"
                      label="MDCN No."
                      name="MDCN No."
                      rules="required"
                      required
                      :max-length="20"
                    />
                  </a-col>
                  <a-col :span="12">
                    <AppInput
                      v-model="profileObj.year_of_graduation"
                      label="Year of Graduation"
                      name="Year of Graduation"
                      rules="required"
                      required
                    />
                  </a-col>
                  <a-col v-if="role === 'doctor'" :span="12">
                    <AppSelect
                      v-model="profileObj.specialty_id"
                      label="Speciality"
                      placeholder="Speciality"
                      name="Speciality"
                      url="/specialties?showAll=true"
                      :call-back-func="
                        (resp) => ({
                          text: resp.name,
                          value: resp.id,
                        })
                      "
                      rules="required"
                      required
                    />
                  </a-col>
                  <a-col :span="12">
                    <AppSelect
                      v-model="profileObj.working_days"
                      label="Working Days"
                      placeholder="Select Working Days"
                      name="Working Days"
                      :remote="false"
                      :data="['Mon', 'Tue', 'Wed', 'Thur', 'fri', 'sat', 'sun']"
                      rules="required"
                      required
                      mode="multiple"
                    />
                  </a-col>
                  <a-col :span="6">
                    <AppTimePicker
                      v-model="profileObj.start_time"
                      label="Starting Time"
                      rules="required"
                      required
                    />
                  </a-col>
                  <a-col :span="6">
                    <AppTimePicker
                      v-model="profileObj.closing_time"
                      label="Closing Time"
                      rules="required"
                      required
                    />
                  </a-col>
                </a-row>
              </a-tab-pane>
            </template>
          </AppTabs>
          <AppTabs v-if="role === 'patient'" v-model="activeKey">
            <template slot="default">
              <a-tab-pane key="1" tab="Next of Kin Information" force-render>
                <a-row type="flex" :gutter="24">
                  <a-col :span="12">
                    <AppInput
                      v-model="profileObj.kin_first_name"
                      label="First Name"
                      name="First Name"
                      rules="required"
                      required
                    />
                  </a-col>
                  <a-col :span="12">
                    <AppInput
                      v-model="profileObj.kin_last_name"
                      label="First Name"
                      name="First Name"
                      rules="required"
                      required
                    />
                  </a-col>
                  <a-col :span="12">
                    <AppInput
                      v-model="profileObj.kin_phone_number"
                      label="Phone Number"
                      name="Phone Number"
                      rules="required"
                      required
                      is-number
                    />
                  </a-col>
                  <a-col :span="12">
                    <AppInput
                      v-model="profileObj.kin_email_address"
                      label="Email"
                      name="Email"
                      rules="required"
                      required
                      disabled
                    />
                  </a-col>
                </a-row>
              </a-tab-pane>
            </template>
          </AppTabs>
          <AppTabs v-if="role !== 'patient'" v-model="activeKey">
            <template slot="default">
              <a-tab-pane key="1" tab="Account Details" force-render>
                <a-row type="flex" :gutter="24">
                  <a-col :span="12">
                    <AppInput
                      v-model="profileObj.account_name"
                      label="Account Name"
                      name="Account Name"
                      rules="required"
                      required
                    />
                  </a-col>
                  <a-col :span="12">
                    <AppInput
                      v-model="profileObj.account_number"
                      label="Account Number"
                      name="Account Number"
                      rules="required"
                      required
                      :max-length="15"
                      :space-allowed="false"
                      :char-allowed="false"
                      :text-allowed="false"
                      is-number
                    />
                  </a-col>
                  <a-col :span="12">
                    <AppSelect
                      v-model="profileObj.bank_name"
                      label="Bank Name"
                      placeholder="Select Bank"
                      name="bank name"
                      url="/banks"
                      :call-back-func="
                        (resp) => ({
                          text: resp.name,
                          value: resp.code,
                        })
                      "
                      rules="required"
                      required
                    />
                  </a-col>
                  <a-col :span="12"> </a-col>
                </a-row>
              </a-tab-pane>
            </template>
          </AppTabs>
        </ValidationObserver>
        <br />
        <div class="t-c">
          <AppButton
            type="primary"
            :block="false"
            :loading="isLoading"
            class="admin-button"
            @click="submitHandler"
            >UPDATE PROFILE</AppButton
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
// import { mapActions } from 'vuex'
import AppTabs from '@/components/AppTabs'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppDatePicker from '@/components/AppDatePicker'
import AppButton from '@/components/AppButton'
import AppTimePicker from '@/components/AppTimePicker'

export default {
  components: {
    AppTabs,
    AppInput,
    AppSelect,
    AppDatePicker,
    ValidationObserver,
    AppButton,
    AppTimePicker,
  },
  layout: 'dashboard',
  data() {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${user.token.token}` },
    }
    const role = user.roles[0].name
    return {
      profileObj: {},
      activeKey: '1',
      isLoading: false,
      config,
      role,
      counter: 0,
    }
  },
  computed: {
    isRegisteredName() {
      return (
        this.role === 'diagnostic' ||
        this.role === 'ambulance' ||
        this.role === 'pharmacy'
      )
    },
  },
  async mounted() {
    try {
      const { data } = await this.$axios.$get('/me', this.config)
      this.profileObj = { ...data }
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
  methods: {
    selectStateHandler() {
      this.counter++
      this.profileObj.city = undefined
    },
    async submitHandler() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      this.isLoading = true
      try {
        if (this.role === 'patient') {
          const { message } = await this.$axios.$post(
            '/update/patient',
            this.profileObj,
            this.config
          )
          this.$notification.success({
            message: 'Success',
            description: message,
            duration: 4000,
          })
        } else {
          const { message } = await this.$axios.$post(
            '/update/partners',
            this.profileObj,
            this.config
          )
          this.$notification.success({
            message: 'Success',
            description: message,
            duration: 4000,
          })
        }
        requestAnimationFrame(() => {
          this.$refs.observer.reset()
          this.isLoading = false
        })
      } catch (err) {
        this.isLoading = false
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
  },
}
</script>
<style lang="scss" scoped>
figure {
  border: 1px solid #bbc5d5;
  border-radius: 5px;
  width: 180px;
  height: 180px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
