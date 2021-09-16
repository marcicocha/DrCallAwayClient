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
              : 'Request a General Practitioner'
          }}
        </h6>
        <a-divider />
        <div>
          <a-form>
            <ValidationObserver ref="observer" tag="div">
              <AppSelect
                v-model="homeCareObj.specialistId"
                :label="`List of ${
                  homeCareKey === 'nurse' ? 'Nurse' : 'General Practitioner'
                }`"
                :placeholder="`Select a ${
                  homeCareKey === 'nurse' ? 'Nurse' : 'General Practitioner'
                }`"
                name="nurse"
                :url="
                  homeCareKey === 'nurse'
                    ? 'list/nurses'
                    : 'specialists/SPELTY022'
                "
                :call-back-func="
                  (resp) => ({
                    text:
                      homeCareKey === 'nurse'
                        ? resp.first_name + ' ' + resp.last_name
                        : resp.user.first_name + ' ' + resp.user.last_name,
                    value: homeCareKey === 'nurse' ? resp.id : resp.user.id,
                    address: resp.address,
                  })
                "
                required
                rules="required"
                @selectedObject="selectedObjectHandler"
              />
              <!-- <AppSelect
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
              /> -->
              <AppInput
                v-model="homeCareObj.days"
                :label="`Number of Days (N${totalPrice}/Day)`"
                name="number of Days"
                placeholder="Enter Number of Days"
                required
                rules="required"
                is-number
                :space-allowed="false"
                :char-allowed="false"
                :text-allowed="false"
              />
              <AppInput
                v-model="homeCareObj.address"
                label="Address"
                name="address"
              />
              <AppDatePicker
                v-model="homeCareObj.date"
                label="Select Start Date"
                name="select start date"
                :disabled-date="disabledDate"
                rules="required"
                required
              />
              <AppTimePicker
                v-model="homeCareObj.time"
                label="Select Start Time"
                name="select start time"
                rules="required"
                required
              />
              <AppInput
                v-model="homeCareObj.additional_info"
                label="Additional Comment"
                name="additional comment"
                rules="required"
                required
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
      @cancel="closeSelectedModal"
    >
      <div>
        <h6 class="t-c">
          {{
            homeCareKey === 'nurse'
              ? `Selected Nurse: ${name}`
              : `Selected General Practitioner: ${name}`
          }}
        </h6>
        <a-divider />
        <div class="colored-table">
          <a-table
            :columns="columns"
            :data-source="priceList"
            :pagination="false"
            :row-key="(record, i) => i"
          >
            <template slot="sn" slot-scope="text, record, index">
              {{ index + 1 }}
            </template></a-table
          >
          <p class="price-total">TOTAL: {{ totalPriceAndDays }}</p>
          <p class="red bold">
            ***Session covers 1hour, new booking to be made to extend session***
          </p>
        </div>
        <br />
        <div>
          <a-row type="flex" :gutter="24">
            <a-col :span="12">
              <AppButton
                type="default"
                :loading="isLoading"
                class="admin-button"
                @click="closeSelectedModal"
                >GO BACK</AppButton
              >
            </a-col>
            <a-col :span="12">
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
import moment from 'moment'
import { mapActions } from 'vuex'
import { ValidationObserver } from 'vee-validate'
import { nurse, generalPractitioner } from '@/drcallawayPrices.json'
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
      nurse,
      generalPractitioner,
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
      name: '',
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
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'PRICE',
          dataIndex: 'price',
          scopedSlots: { customRender: 'price' },
        },
      ]
      return columns
    },
    priceList() {
      if (this.homeCareKey === 'nurse') {
        return nurse[0].services
      }
      return generalPractitioner[0].services
    },
    totalPrice() {
      let total = 0
      this.priceList.forEach((record) => (total += record.price))
      return total
    },
    totalPriceAndDays() {
      const totalDays = this.totalPrice * this.homeCareObj.days
      return totalDays
    },
    user() {
      const userObject = JSON.parse(localStorage.getItem('user'))
      return {
        email: userObject.email,
        firstName: userObject.first_name,
        lastName: userObject.last_name,
        amount: this.totalPriceAndDays,
      }
    },
  },
  mounted() {},
  methods: {
    // selectHandler(value, options) {
    //   const description = options.componentOptions.propsData.title
    //   this.name = description
    // },
    selectedObjectHandler(rcd) {
      this.name = rcd.text
      // this.homeCareObj.address = rcd.address
    },
    showModalhandler(key) {
      this.modalIsVisible = true
      this.homeCareKey = key
    },
    closeModal() {
      this.modalIsVisible = false
      this.homeCareObj = {}
    },
    closeSelectedModal() {
      this.selectedModalIsVisible = false
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().startOf('day')
    },
    async callback(res) {
      if (res.message === 'Approved') {
        this.$notification.success({
          message: res.message,
          description: 'Payment successful',
          duration: 4000,
        })
        this.isLoading = true
        try {
          if (this.homeCareKey === 'nurse') {
            const obj = {
              ...this.homeCareObj,
              partner_id: this.homeCareObj.specialistId,
              description: this.homeCareObj.additional_info,
              date: moment(this.homeCareObj.date).format('YYYY-MM-DD'),
              time: moment(this.homeCareObj.time).format('HH:mm:ss'),
            }
            const message = await this.submitNurseHandler(obj)
            this.$notification.success({
              message: 'Success',
              description: message,
              duration: 4000,
            })
          } else {
            const obj = {
              ...this.homeCareObj,
              specialtyId: 215,
              date: moment(this.homeCareObj.date).format('YYYY-MM-DD'),
              time: moment(this.homeCareObj.time).format('HH:mm:ss'),
            }
            const message = await this.submitAppointmentHandler(obj)
            this.$notification.success({
              message: 'Success',
              description: message,
              duration: 4000,
            })
          }

          requestAnimationFrame(() => {
            this.$refs.observer.reset()
            this.isLoading = false
            this.modalIsVisible = false
            this.selectedModalIsVisible = false
            this.homeCareObj = {}
            this.$emit('formSubmissionCompleted')
          })
          this.$router.replace('/admin/patient/appointment')
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
      this.isLoading = true
      const userObject = JSON.parse(localStorage.getItem('user'))
      const config = {
        headers: { Authorization: `Bearer ${userObject.token.token}` },
      }
      const { isFree, message } = await this.$axios.$get(
        `/appointment/checkIfFree?date=${moment(this.homeCareObj.date).format(
          'YYYY-MM-DD'
        )}&time=${moment(this.homeCareObj.time).format(
          'HH:mm:ss'
        )}&specialistId=${this.homeCareObj.specialistId}`,
        config
      )
      if (!isFree) {
        this.$notification.error({
          message: 'Error',
          description: message,
          duration: 4000,
        })
        this.isLoading = false
        return
      }
      this.selectedModalIsVisible = true
    },
    ...mapActions({
      submitAppointmentHandler: 'appointmentModule/BOOK_APPOINTMENT',
      submitNurseHandler: 'appointmentModule/BOOK_NURSE',
    }),
  },
}
</script>
<style lang="scss" scoped>
h6 {
  color: $dark-purple;
}
.payButton {
  width: 100%;
}
.price-total {
  text-align: right;
  margin-top: 1rem;
  font-weight: bold;
  color: $dark-purple;
}
</style>
