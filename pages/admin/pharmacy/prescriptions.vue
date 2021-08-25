<template>
  <div>
    <p class="page_heading">CALLUPS</p>
    <AppTabs v-model="activeKey" @tabClick="changeTabHandler">
      <template slot="default">
        <a-tab-pane key="1" tab="Pending Prescription" force-render>
          <AppPrescriptionDataTable
            status="PENDING"
            :data-source="allPrescription"
            @showPresciptionModal="showPresciptionModal"
            @acceptPrescriptionHandler="acceptPrescriptionHandler"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Completed Prescription">
          <AppPrescriptionDataTable
            status="COMPLETED"
            :data-source="allPrescription"
            @showPresciptionModal="showPresciptionModal"
          />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Declined Prescription">
          <AppPrescriptionDataTable
            status="DECLINED"
            :data-source="allPrescription"
            @showPresciptionModal="showPresciptionModal"
          />
        </a-tab-pane>
      </template>
      <template v-if="false" slot="rightInfo">
        <a-row type="flex" :gutter="16" class="right-info">
          <a-col :span="12">
            <AppSelect
              v-model="filterObj.filterKey"
              placeholder="Select filter option"
              :data="['YES']"
              class="filter"
              :remote="true"
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="filterObj.filterValue"
              placeholder="Search"
              class="filter"
              name="value"
            />
          </a-col>
        </a-row>
      </template>
    </AppTabs>
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
        <h6 class="t-c">Prescription for Strong Headache</h6>
        <a-row type="flex" :gutter="16">
          <a-col :span="12">
            <AppInput
              v-model="currentPrescription.prescriptionId"
              label="Prescription ID"
            />
          </a-col>
          <a-col :span="12">
            <AppInput
              v-model="currentPrescription.prescriptionBy"
              label="Prescription By"
            />
          </a-col>
          <a-col :span="12">
            <AppDatePicker
              v-model="currentPrescription.prescriptionDate"
              label="Prescription Date"
            />
          </a-col>
          <a-col :span="12">
            <AppDatePicker
              v-model="currentPrescription.patientName"
              label="Patient Name"
            />
          </a-col>
        </a-row>
        <div>
          <p>Prescribed Drugs</p>
          <a-table
            :columns="columns"
            :data-source="currentPrescription.drugs"
            :pagination="false"
            :row-key="(record) => record.id"
          >
            <template slot="sn" slot-scope="text, record, index">
              {{ index + 1 }}
            </template>
          </a-table>
        </div>

        <div v-if="currentPrescription.pharmacy">
          <p>Pharmacy Information</p>
          <a-table
            :columns="columns"
            :data-source="currentPrescription.pharmacy"
            :pagination="false"
            :row-key="(record) => record.id"
          >
            <template slot="sn" slot-scope="text, record, index">
              {{ index + 1 }}
            </template>
          </a-table>
        </div>
        <br />
        <div v-if="currentPrescription === 'PENDING'" class="t-c">
          <AppButton
            type="primary"
            :block="false"
            :loading="isLoading"
            class="admin-button"
            @click="submitHandler"
            >DISPENSED</AppButton
          >
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import AppTabs from '@/components/AppTabs'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppDatePicker from '@/components/AppDatePicker'
import AppPrescriptionDataTable from '@/components/admin/pharmacy/AppPrescriptionDataTable'
export default {
  components: {
    AppTabs,
    AppInput,
    AppSelect,
    AppPrescriptionDataTable,
    AppDatePicker,
  },
  layout: 'dashboard',
  data() {
    return {
      activeKey: '1',
      filterObj: {},
      modalIsVisible: false,
      currentPrescription: {},
      confirmLoading: false,
      isLoading: false,
      status: 'PENDING',
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
          title: 'NAME',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'DOSAGE',
          dataIndex: 'dosage',
        },
        {
          title: 'DURATION (DAYS)',
          dataIndex: 'duration',
        },
      ]
      return columns
    },
    ...mapState({
      allPrescription: (state) =>
        state.prescriptionPharmacyModule.prescriptions,
    }),
  },
  mounted() {
    this.changeTabHandler('1')
  },
  methods: {
    showPresciptionModal(record) {
      this.currentPrescription = record
      this.modalIsVisible = true
    },
    closeModal() {
      this.modalIsVisible = false
    },
    async submitHandler() {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        const config = {
          headers: { Authorization: `Bearer ${user.token.token}` },
        }
        await this.$axios.$patch(
          `pharmacy/accept/prescription/${this.currentPrescription.id}`,
          this.currentPrescription.id,
          config
        )
        this.$notification.success({
          message: 'Success',
          description: 'Request Accepted Successfully',
        })
        this.changeTabHandler('2')
        this.activeKey = '2'
      } catch (e) {
        const { default: errorHandler } = await import('@/utils/errorHandler')
        errorHandler(e).forEach((msg) => {
          this.$notification.error({
            message: 'Error',
            description: msg,
          })
        })
      }
    },
    acceptPrescriptionHandler(record) {
      const $this = this
      this.$confirm({
        title: 'Are you sure you want to accept this Requests?',
        content: `With ID: ${record.id}`,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
          // vm.showModal(false)
          try {
            const user = JSON.parse(localStorage.getItem('user'))
            const config = {
              headers: { Authorization: `Bearer ${user.token.token}` },
            }
            await $this.$axios.$patch(
              `ambulance/accept/callup/${record.id}`,
              record.id,
              config
            )
            $this.$notification.success({
              message: 'Success',
              description: 'Request Accepted Successfully',
            })
            $this.changeTabHandler('2')
            $this.activeKey = '2'
          } catch (e) {
            const { default: errorHandler } = await import(
              '@/utils/errorHandler'
            )
            errorHandler(e).forEach((msg) => {
              $this.$notification.error({
                message: 'Error',
                description: msg,
              })
            })
          }
        },
        onCancel() {},
      })
    },
    async changeTabHandler(key) {
      if (key === '1') {
        this.status = 'PENDING'
      }
      if (key === '2') {
        this.status = 'COMPLETED'
      }
      if (key === '3') {
        this.status = 'DECLINED'
      }
      try {
        const obj = {
          ...this.filterObj,
          status: this.status,
        }
        await this.getAllPrescription(obj)
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
    ...mapActions({
      getAllPrescription: 'prescriptionPharmacyModule/GET_ALL_PRESCRIPTION',
    }),
  },
}
</script>
<style lang="scss" scoped>
h6 {
  color: $dark-purple;
}
</style>
