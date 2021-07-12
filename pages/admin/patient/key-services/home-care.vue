<template>
  <div>
    <a-row type="flex" :gutter="24">
      <a-col v-for="(card, j) in consultationCardList" :key="j" :span="12">
        <AppDashboardCard
          :card-obj="card"
          :color="card.color"
          @click="showModalhandler(card.key)"
        />
      </a-col>
    </a-row>
    <a-modal
      :visible="modalIsVisible"
      width="550px"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
      centered
      @cancel="closeModal"
    >
      <div>
        <h6 class="t-c">
          {{
            homeCareKey === 'nurse'
              ? 'Request a Nurse'
              : 'Request a General Practioner'
          }}
        </h6>
        <a-divider />
        <div>
          <a-form>
            <ValidationObserver ref="observer" tag="div">
              <AppSelect
                v-if="homeCareKey === 'nurse'"
                v-model="homeCareObj.nurse"
                label="List of Nurse"
                placeholder="Select a Nurse"
                name="nurse"
                url="list/nurses"
                :call-back-func="
                  (resp) => ({
                    text: resp.first_name + ' ' + resp.last_name,
                    value: resp.id,
                  })
                "
                @change="changeNurseHandler"
              />
              <AppSelect
                v-if="homeCareKey === 'practitioner'"
                v-model="homeCareObj.generalPractitioner"
                label="List of General Practitioner"
                placeholder="Select a General Practitioner"
                name="nurse"
                rules="required"
                required
                url="specialists/5"
                :call-back-func="
                  (resp) => ({
                    text: resp.user.first_name + ' ' + resp.user.last_name,
                    value: resp.id,
                  })
                "
                @change="changeSpecialistHandler"
              />
              <AppInput
                v-model="homeCareObj.noOfDays"
                label="Number of Days"
                name="number of Days"
                placeholder="Enter Number of Days"
                required
                rules="required"
              />
              <AppInput
                v-model="homeCareObj.address"
                label="Address"
                name="address"
                placeholder="Enter Address"
              />
              <AppDatePicker
                v-model="homeCareObj.date"
                label="Select Start Date"
                name="select start date"
              />
              <AppTimePicker
                v-model="homeCareObj.time"
                label="Select Start Time"
                name="select start time"
              />
              <AppInput
                v-model="homeCareObj.additional_info"
                label="Additional Comment"
                name="additional comment"
              />
            </ValidationObserver>
            <br />
            <div class="t-c">
              <AppButton
                type="primary"
                :block="false"
                :loading="isLoading"
                class="admin-button"
                @click="submitHandler"
                >SUBMIT</AppButton
              >
            </div>
          </a-form>
        </div>
      </div>
    </a-modal>
    <a-modal
      :visible="selectedModalIsVisible"
      width="600px"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
      centered
      @cancel="closeModal"
    >
      <div>
        <h6 class="t-c">
          {{
            homeCareKey === 'nurse'
              ? `Selected Nurse: ${homeCareObj.nurse}`
              : `Selected General Practitioner: ${homeCareObj.generalPractitioner}`
          }}
        </h6>
        <a-divider />
        <div class="colored-table">
          <a-table
            :columns="columns"
            :data-source="dataSource"
            :pagination="false"
            :row-key="(record) => record.id"
          ></a-table>
        </div>
        <br />
        <div>
          <a-row type="flex" :gutter="24">
            <a-col :span="8" :offset="4">
              <AppButton
                type="default"
                :loading="isLoading"
                class="admin-button"
                @click="closeModal"
                >GO BACK</AppButton
              >
            </a-col>
            <a-col :span="8">
              <AppPayment :user-obj="user" @callback="callback">
                MAKE PAYMENT
              </AppPayment>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { ValidationObserver } from 'vee-validate'
import AppDashboardCard from '@/components/AppDashboardCard'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppPayment from '@/components/AppPayment.vue'
import AppDatePicker from '@/components/AppDatePicker'
import AppTimePicker from '@/components/AppTimePicker'
export default {
  components: {
    AppDashboardCard,
    AppInput,
    AppSelect,
    ValidationObserver,
    AppPayment,
    AppTimePicker,
    AppDatePicker,
  },
  layout: 'dashboard',
  data() {
    return {
      modalIsVisible: false,
      confirmLoading: false,
      homeCareKey: '',
      isLoading: false,
      homeCareObj: {},
      selectedModalIsVisible: false,
      dataSource: [],
      consultationCardList: [
        {
          key: 'nurse',
          firstText: 'Request a',
          secondText: 'NURSE',
          imgSrc: 'admin/patient/1.png',
          color: '#641C62',
        },
        {
          key: 'practitioner',
          firstText: 'Request a',
          secondText: 'GENERAL PRACTITIONER',
          imgSrc: 'admin/patient/2.png',
          color: '#BB58B6',
        },
      ],
      user: {},
    }
  },
  computed: {
    columns() {
      const columns = [
        {
          title: 'S/N',
          dataIndex: 'sn',
          scopedSlots: { customRender: 'sn' },
        },
        {
          title: 'NAME OF SERVICE',
          dataIndex: 'nameOfService',
          scopedSlots: { customRender: 'nameOfService' },
        },
        {
          title: 'PRICE',
          dataIndex: 'price',
          scopedSlots: { customRender: 'price' },
        },
      ]
      return columns
    },
  },
  mounted() {
    const userObject = JSON.parse(localStorage.getItem('user'))
    this.user = {
      email: userObject.email,
      firstName: userObject.first_name,
      lastName: userObject.last_name,
      amount: 100,
    }
  },
  methods: {
    changeNurseHandler() {
      console.log('CHANGED')
    },
    changeSpecialistHandler() {
      console.log('CHANGED')
    },
    showModalhandler(key) {
      this.modalIsVisible = true
      this.homeCareKey = key
    },
    closeModal() {
      this.modalIsVisible = false
      this.selectedModalIsVisible = false
    },
    async callback(res) {
      if (res.message === 'Approved') {
        this.$notification.success({
          message: res.message,
          description: 'Payment successful',
          duration: 4000,
        })
        try {
          const message = await this.submitAppointmentHandler(
            this.nutritionistObj
          )
          this.$notification.success({
            message: 'Success',
            description: message,
            duration: 4000,
          })
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
            this.isLoading = false
            this.modalIsVisible = false
            this.nutritionistObj = {}
            this.$emit('formSubmissionCompleted')
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
      }
    },
    async submitHandler() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      // this.isLoading = true
      this.selectedModalIsVisible = true
    },
    ...mapActions({
      submitAppointmentHandler: 'appointmentModule/BOOK_APPOINTMENT',
    }),
  },
}
</script>
<style lang="scss" scoped>
h6 {
  color: $dark-purple;
}
</style>
