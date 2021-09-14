<template>
  <div>
    <p class="page_heading">Profile Information</p>
    <div class="admin-wrapper">
      <p class="profile_text">Profile Wrapper</p>
      <div class="profile">
        <a-upload
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </div>

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
                      :label="rcLabel"
                      :name="rcLabel"
                      rules="required"
                      required
                    />
                  </a-col>
                  <a-col :span="12">
                    <AppInput
                      v-model="profileObj.address"
                      label="Address"
                      name="Address"
                      rules="required"
                      required
                    />
                  </a-col>
                  <a-col v-if="role === 'patient'" :span="12">
                    <AppSelect
                      v-model="profileObj.gender"
                      label="Gender"
                      placeholder="Gender"
                      name="gender"
                      :remote="true"
                      :data="['Male', 'Female']"
                    />
                  </a-col>
                  <a-col v-if="role !== 'patient'" :span="12">
                    <AppUpload
                      label="Upload License"
                      placeholder="click here to upload licence"
                      :extenstion="['pdf', 'jpg', 'png']"
                      @change="documentHandler($event, 'license')"
                    />
                  </a-col>
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
                  <a-col v-if="role === 'pharmacy'" :span="12">
                    <AppInput
                      v-model="profileObj.premise_reg"
                      label="Premise Reg Number"
                      name="Premise Reg Number"
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
                      :label="nurseLabel.schoolLabel"
                      :name="nurseLabel.schoolLabel"
                      rules="required"
                      required
                    />
                  </a-col>
                  <a-col :span="12">
                    <AppInput
                      v-model="profileObj.nmcn_license_no"
                      :label="nurseLabel.licenseNo"
                      :name="nurseLabel.licenseNo"
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
                  <a-col v-if="role === 'nurse'" :span="12">
                    <AppInput
                      v-model="profileObj.year_of_experience"
                      label="Years of Experience"
                      name="Years of Experience"
                      rules="required"
                      required
                      :max-length="15"
                      :space-allowed="false"
                      :char-allowed="false"
                      :text-allowed="false"
                      is-number
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
                      @selectedObject="
                        selectedObjectHandler($event, 'specialty')
                      "
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
                  <a-col :span="24">
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
                      @selectedObject="selectedObjectHandler($event, 'bank')"
                    />
                  </a-col>
                  <!-- <a-col :span="12"> </a-col> -->
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
import { getDownloadURL } from 'firebase/storage'
import { storage } from '~/plugins/firebase.js'
// import { mapActions } from 'vuex'
import AppTabs from '@/components/AppTabs'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppDatePicker from '@/components/AppDatePicker'
import AppButton from '@/components/AppButton'
import AppTimePicker from '@/components/AppTimePicker'
import AppUpload from '@/components/AppUpload'
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  components: {
    AppTabs,
    AppInput,
    AppSelect,
    AppDatePicker,
    ValidationObserver,
    AppButton,
    AppTimePicker,
    AppUpload,
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
      loading: false,
      imageUrl: '',
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
    rcLabel() {
      if (this.role === 'ambulance') {
        return 'Ambulance Reg Number'
      }
      if (this.role === 'pharmacy') {
        return 'PCN Reg Number'
      }
      return 'Rc Number'
    },
    nurseLabel() {
      if (this.role === 'nurse') {
        return {
          schoolLabel: 'Nursing School Attended',
          licenseNo: 'NMCN License No',
        }
      }
      return { schoolLabel: 'Medical School Attended', licenseNo: 'MDCN No.' }
    },
  },
  async mounted() {
    try {
      const { data } = await this.$axios.$get('/me', this.config)
      this.profileObj = { ...data }
      this.profileObj.bank_name = data.bank
      if (data.profile_pic) {
        this.imageUrl = data.profile_pic
      }
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
    selectedObjectHandler(rcd, key) {
      if (key === 'specialty') {
        this.profile.specialty_description = rcd.text
      }
      this.profileObj.bank_description = rcd.text
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loading = false
        })
        const storageRef = storage.ref('profile/' + info.file.name)
        const uploadTask = storageRef.put(info.file.originFileObj)
        uploadTask.on('state_changed', () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.profileObj.profile_pic = downloadURL
          })
        })
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG or PNG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    documentHandler(file, key) {
      const storageRef = storage.ref('licence/' + file.name)
      const uploadTask = storageRef.put(file.originFileObj)
      uploadTask.on('state_changed', () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (key === 'license') {
            this.profileObj.license_link = downloadURL
          }
        })
      })
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
.profile_text {
  color: $dark-purple;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}
</style>
