<template>
  <div>
    <AppTabs v-model="activeKey" @tabClick="changeTabHandler">
      <template slot="default">
        <a-tab-pane key="1" tab="Tests" force-render>
          <AppScreeningDataTable
            status="test"
            :data-source="testDataSource"
            @changeSelectedlistHandler="changeSelectedlistHandler"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Endocrinology: Special Test">
          <AppScreeningDataTable
            status="standard"
            :data-source="endocrinologyDataSource"
            @changeSelectedlistHandler="changeSelectedlistHandler"
          />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Special Examinations">
          <AppScreeningDataTable
            status="special"
            :data-source="specialDataSource"
            @changeSelectedlistHandler="changeSelectedlistHandler"
          />
        </a-tab-pane>
        <a-tab-pane key="4" tab="Ultrasound Scan" force-render>
          <AppScreeningDataTable
            status="ultrasound"
            :data-source="ultrasoundDataSource"
            @changeSelectedlistHandler="changeSelectedlistHandler"
          />
        </a-tab-pane>
      </template>
      <template slot="rightInfo">
        <div class="right-info">
          <AppInput
            v-model="filterObj.filterValue"
            placeholder="Search"
            class="filter"
            name="value"
          />
        </div>
      </template>
    </AppTabs>
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
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import AppScreeningDataTable from '@/components/admin/doctor/case-file/AppScreeningDataTable'
import AppInput from '@/components/AppInput'

export default {
  name: 'AppScreeningTab',
  components: {
    AppScreeningDataTable,
    AppInput,
  },
  props: {
    caseId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      activeKey: '1',
      filterObj: {},
      status: '',
      testDataSource: [],
      specialDataSource: [],
      ultrasoundDataSource: [],
      endocrinologyDataSource: [],
      isLoading: false,
      selectedList: [],
    }
  },
  async mounted() {
    try {
      const obj = {
        ...this.filterObj,
        // status: this.status,
      }
      const data = await this.getAllMedicalScreening(obj)

      data.forEach((rcd) => {
        if (rcd.category === 'Tests') {
          this.testDataSource = rcd.data
        }
        if (rcd.category === 'Endocrinology: Special Examination Tests') {
          this.endocrinologyDataSource = rcd.data
        }
        if (rcd.category === 'Special Examination') {
          this.specialDataSource = rcd.data
        }
        if (rcd.category === 'Ultrasound Scan') {
          this.ultrasoundDataSource = rcd.data
        }
      })
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
    changeSelectedlistHandler(e, record) {
      if (e.target.checked) {
        this.selectedList.push(record)
      } else {
        const newArray = this.selectedList.filter(
          (rcd) => rcd.name !== record.name
        )
        this.selectedList = newArray
      }
    },
    async submitHandler() {
      this.isLoading = true
      try {
        const obj = {
          case_file_id: this.caseId,
          tests: [...this.selectedList],
        }
        const message = await this.submitTestsHandler(obj)

        this.$notification.success({
          message: 'Success',
          description: message,
          duration: 4000,
        })
        this.isLoading = false
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
    changeTabHandler(key) {
      this.$emit('currentKeyHandler', key)
      // if (key === '1') {
      //   this.status = 'BASIC'
      // }
      // if (key === '2') {
      //   this.status = 'STANDARD'
      // }
      // if (key === '3') {
      //   this.status = 'PREMIUM'
      // }
      // if (key === '4') {
      //   this.status = 'EXECUTIVE'
      // }
      // try {
      //   const obj = {
      //     ...this.filterObj,
      //     // status: this.status,
      //   }
      //   await this.getAllMedicalScreening(obj)
      // } catch (err) {
      //   const { default: errorHandler } = await import('@/utils/errorHandler')
      //   errorHandler(err).forEach((msg) => {
      //     this.$notification.error({
      //       message: 'Error',
      //       description: msg,
      //       duration: 4000,
      //     })
      //   })
      // }
    },
    ...mapActions({
      getAllMedicalScreening: 'caseFileDoctorModule/GET_ALL_TEST',
      submitTestsHandler: 'caseFileDoctorModule/ADD_TEST',
    }),
  },
}
</script>
<style lang="scss" scoped>
.right-info {
  width: 15% !important;
}
</style>
