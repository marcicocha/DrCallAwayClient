<template>
  <div>
    <h6>Book an Appointment</h6>
    <div class="admin-wrapper">
      <a-form>
        <a-row type="flex" :gutter="16">
          <a-col :span="12">
            <AppSelect
              v-model="bookAppointmentObj.medicalSpecialties"
              label="List of Medical Specialties"
              placeholder="Select a Medical Specialty"
              name="medical specialties"
              :data="['YES']"
              :remote="true"
            />
          </a-col>
          <a-col :span="12">
            <AppSelect
              v-model="bookAppointmentObj.specialists"
              label="List of Specialists"
              placeholder="Select a Specialist"
              name="specialists"
              :data="['YES']"
              :remote="true"
            />
            <small style="color: #3d0c3c"
              >One will be automatically selected for you if you don't know whom
              to select</small
            >
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="bookAppointmentObj.specialistAddress"
              label="Specialist Address"
              name="Specialist Address"
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="bookAppointmentObj.paymentCharge"
              label="Payment Charge"
              name="payment charge"
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="bookAppointmentObj.proposedDate"
              label="Select Proposed Date"
              name="select proposed date"
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="bookAppointmentObj.proposedTime"
              label="Select Proposed Time"
              name="select proposed time"
            />
          </a-col>
          <a-col :span="24">
            <AppTextArea
              v-model="bookAppointmentObj.additionalComment"
              label="Additional Comment"
              placeholder="Briefly tell Specialist how you are feeling"
            />
          </a-col>
        </a-row>
        <br />
        <div class="t-c">
          <AppButton
            type="primary"
            :block="false"
            :loading="isLoading"
            class="admin-button"
            @click="submitHandler"
            >CALLUP</AppButton
          >
        </div>
      </a-form>
      <a-modal
        :visible="modalIsVisible"
        width="600px"
        :confirm-loading="confirmLoading"
        :footer="null"
        :destroy-on-close="true"
        :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
        centered
        @cancel="closeModal"
      >
        <div>
          <div>
            <h6 class="t-c">
              {{
                `Selected Specialist: ${bookAppointmentObj.specialists} (${bookAppointmentObj.specialistAddress})`
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
        </div>
      </a-modal>
    </div>
  </div>
</template>
<script>
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppTextArea from '@/components/AppTextArea'
import AppButton from '@/components/AppButton'
export default {
  components: {
    AppInput,
    AppSelect,
    AppTextArea,
    AppButton,
  },
  layout: 'dashboard',
  data() {
    return {
      bookAppointmentObj: {},
      isLoading: false,
      modalIsVisible: false,
      confirmLoading: false,
      dataSource: [],
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
    submitHandler() {
      this.modalIsVisible = true
    },
    closeModal() {
      this.modalIsVisible = false
    },
  },
}
</script>
<style lang="scss" scoped>
h6 {
  color: $dark-purple;
}
</style>
