<template>
  <div>
    <div v-if="!specialIsVisible">
      <a-row type="flex" :gutter="24">
        <a-col v-for="(card, j) in consultationCardList" :key="j" :span="12">
          <AppDashboardCard
            :card-obj="card"
            :color="card.color"
            @click="changeConsultationRoute(card.key)"
          />
        </a-col>
      </a-row>
      <br />
      <p class="red" style="font-weight: bold">
        NOTE: Please be informed that your subscription does not cover for the
        SPECIAL AILMENT Consultation as you have to make payment for this
        service.
      </p>
    </div>

    <div v-if="specialIsVisible">
      <div>
        <a @click="closeViewHandler"
          ><img src="@/assets/images/long-arrow-left.svg"
        /></a>
      </div>
      <br />
      <a-row type="flex" :gutter="24">
        <a-col v-for="(card, i) in specialServiceList" :key="i" :span="12">
          <AppDashboardCard
            :card-obj="card"
            :color="card.color"
            style="margin-bottom: 2rem"
            @click="specialServiceHandler(card)"
          />
        </a-col>
      </a-row>
      <br />
    </div>
    <a-modal
      :visible="generalIsVisible"
      width="420px"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
      centered
      @cancel="closeModal"
    >
      <div>
        <h6 class="t-c">What is your Ailment</h6>
        <a-divider />
        <div>
          <a-form>
            <ValidationObserver ref="observer" tag="div">
              <AppInput
                v-model="ailmentObj.ailment"
                label="Ailment"
                name="ailment"
                required
                rules="required"
              />
              <AppTextArea
                v-model="ailmentObj.how_you_feel"
                label="Tell us how you feel"
              />
              <p>Not more than 200 words</p>
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
      :visible="specialModalIsVisible"
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
          {{ `Selected Ailment: ${specialModalObj.secondText}` }}
        </h6>
        <a-divider />
        <div class="colored-table">
          <a-table
            :columns="columns"
            :data-source="dataSource"
            :loading="tableIsLoading"
            :pagination="false"
            :row-key="(record) => record.id"
          >
            <template slot="sn" slot-scope="text, record, index">
              {{ index + 1 }}
            </template></a-table
          >
          <p class="price-total">TOTAL: {{ totalPrice }}</p>
        </div>
        <br />
        <div>
          <a-row type="flex" :gutter="24">
            <a-col :span="12">
              <AppButton
                type="default"
                :loading="isLoading"
                class="admin-button"
                @click="closeModal"
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
import { ValidationObserver } from 'vee-validate'
import AppPayment from '@/components/AppPayment.vue'
import AppDashboardCard from '@/components/AppDashboardCard'
import AppInput from '@/components/AppInput'
import AppTextArea from '@/components/AppTextArea'
import AppButton from '@/components/AppButton'

export default {
  components: {
    AppDashboardCard,
    AppInput,
    ValidationObserver,
    AppTextArea,
    AppButton,
    AppPayment,
  },
  layout: 'dashboard',
  data() {
    return {
      generalIsVisible: false,
      specialIsVisible: false,
      specialModalIsVisible: false,
      tableIsLoading: false,
      specialModalObj: {},
      confirmLoading: false,
      ailmentObj: {},
      dataSource: [],
      isLoading: false,
      consultationCardList: [
        {
          key: 'general',
          firstText: 'Consultation for',
          secondText: 'General ailments',
          imgSrc: 'admin/patient/2.png',
          color: '#641C62',
        },
        {
          key: 'special',
          firstText: 'Consultation for',
          secondText: 'Special ailments',
          imgSrc: 'admin/patient/2.png',
          color: '#BB58B6',
        },
      ],
      specialServiceList: [
        {
          key: 'hiv',
          firstText: 'Specialist in',
          secondText: 'HIV/TUBERCULOSIS',
          imgSrc: 'admin/patient/2.png',
          color: '#641C62',
        },
        {
          key: 'diabetes',
          firstText: 'Specialist in',
          secondText: 'DIABETES',
          imgSrc: 'admin/patient/2.png',
          color: '#BB58B6',
        },
        {
          key: 'sickle-cell',
          firstText: 'Specialist in',
          secondText: 'SICKLE CELL',
          imgSrc: 'admin/patient/2.png',
          color: '#BB58B6',
        },
        {
          key: 'psychiatrist',
          firstText: 'Book Appointment With a',
          secondText: 'PSYCHIATRIST',
          imgSrc: 'admin/patient/2.png',
          color: '#641C62',
        },
      ],
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
          dataIndex: 'amount',
          scopedSlots: { customRender: 'amount' },
        },
      ]
      return columns
    },
    specialtyCode() {
      if (this.specialModalObj.secondText === 'HIV/TUBERCULOSIS') {
        return 'SPELTY019'
      }
      if (this.specialModalObj.secondText === 'DIABETES') {
        return 'SPELTY007'
      }
      if (this.specialModalObj.secondText === 'SICKLE CELL') {
        return 'SPELTY009'
      }
      return 'SPELTY016'
    },
    totalPrice() {
      let total = 0
      this.dataSource.forEach((record) => (total += record.amount))
      return total
    },
    user() {
      const userObject = JSON.parse(localStorage.getItem('user'))
      return {
        email: userObject.email,
        firstName: userObject.first_name,
        lastName: userObject.last_name,
        amount: this.totalPrice,
      }
    },
  },
  methods: {
    async getPriceHandler(key) {
      this.tableIsLoading = true
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        const config = {
          headers: { Authorization: `Bearer ${user.token.token}` },
        }
        const { data } = await this.$axios.$get(
          `get_service_and_price_list?type=${key}`,
          config
        )
        this.dataSource = data
        this.tableIsLoading = false
      } catch (err) {
        this.tableIsLoading = false
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
    changeConsultationRoute(key) {
      console.log('CLICKED')
      if (key === 'general') {
        this.generalIsVisible = true
      }
      if (key === 'special') {
        this.specialIsVisible = true
      }
    },
    closeViewHandler() {
      this.specialIsVisible = false
    },
    closeModal() {
      this.generalIsVisible = false
      this.specialModalIsVisible = false
    },
    async callback(res) {
      if (res.message === 'Approved') {
        this.$notification.success({
          message: res.message,
          description: 'Payment successful',
          duration: 4000,
        })
        try {
          const user = JSON.parse(localStorage.getItem('user'))
          const config = {
            headers: { Authorization: `Bearer ${user.token.token}` },
          }
          const obj = {
            ailment: this.specialModalObj.secondText,
            how_you_feel: `I need a specialist in ${this.specialModalObj.secondText}`,
            initial_complain: this.specialModalObj.secondText,
            specialty_code: this.specialtyCode,
          }

          const { message } = await this.$axios.$post('cases', obj, config)
          this.$notification.success({
            message: 'Success',
            description: message,
            duration: 4000,
          })

          this.specialModalIsVisible = false
          this.$router.replace('/admin/patient/case-file')
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
    async submitHandler() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      this.isLoading = true
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        const config = {
          headers: { Authorization: `Bearer ${user.token.token}` },
        }
        const ailmentObj = {
          ...this.ailmentObj,
          initial_complain: this.ailmentObj.ailment,
        }
        const { message } = await this.$axios.$post('cases', ailmentObj, config)

        this.$notification.success({
          message: 'Success',
          description: message,
          duration: 4000,
        })
        this.$router.replace('/admin/patient/case-file')
        requestAnimationFrame(() => {
          this.$refs.observer.reset()
          this.isLoading = false
          this.generalIsVisible = false
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
    specialServiceHandler(obj) {
      this.specialModalIsVisible = true
      this.specialModalObj = obj
      this.dataSource = []
      if (obj.secondText === 'HIV/TUBERCULOSIS') {
        this.getPriceHandler('hivTuberculosis')
      }
      if (obj.secondText === 'DIABETES') {
        this.getPriceHandler('diabetes')
      }
      if (obj.secondText === 'SICKLE CELL') {
        this.getPriceHandler('sickleCell')
      }
      if (obj.secondText === 'PSYCHIATRIST') {
        this.getPriceHandler('psychiatry')
      }
    },
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
</style>
