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
              <AppButton
                type="primary"
                :loading="isLoading"
                class="admin-button"
                @click="closeModal"
                >MAKE PAYMENT</AppButton
              >
            </a-col>
          </a-row>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
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
  },
  layout: 'dashboard',
  data() {
    return {
      generalIsVisible: false,
      specialIsVisible: false,
      specialModalIsVisible: false,
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
  methods: {
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
        const { message } = await this.$axios.$post(
          'cases',
          this.ailmentObj,
          config
        )

        this.$notification.success({
          message: 'Success',
          description: message,
          duration: 4000,
        })
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
    },
  },
}
</script>
<style lang="scss" scoped>
h6 {
  color: $dark-purple;
}
</style>
