<template>
  <div>
    <AppTabs v-model="activeKey" @tabClick="changeTabHandler">
      <template slot="default">
        <a-tab-pane key="1" tab="Basic" force-render>
          <AppScreeningDataTable
            status="basic"
            :data-source="basicDataSource.test_name"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Standard">
          <AppScreeningDataTable
            status="standard"
            :data-source="standardDataSource.test_name"
          />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Premium">
          <AppScreeningDataTable
            status="premium"
            :data-source="premiumDataSource.test_name"
          />
        </a-tab-pane>
        <a-tab-pane key="4" tab="Executive" force-render>
          <AppScreeningDataTable
            status="executive"
            :data-source="executiveDataSource.test_name"
          />
        </a-tab-pane>
      </template>
      <template slot="rightInfo">
        <a-row type="flex" :gutter="16" class="right-info" justify="end">
          <a-col v-if="false" :span="12">
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
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import AppScreeningDataTable from '@/components/admin/patient/key-service/wellness-nutrition/AppScreeningDataTable'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'

export default {
  name: 'AppScreeningTab',
  components: {
    AppScreeningDataTable,
    AppInput,
    AppSelect,
  },
  data() {
    return {
      activeKey: '1',
      filterObj: {},
      status: '',
      basicDataSource: {},
      premiumDataSource: {},
      executiveDataSource: {},
      standardDataSource: {},
      price: 0,
    }
  },
  computed: {
    ...mapState({
      allMedicalScreening: (state) => state.testsModule.medicalScreenings,
    }),
  },
  async mounted() {
    try {
      const obj = {
        ...this.filterObj,
        // status: this.status,
      }
      const data = await this.getAllMedicalScreening(obj)
      data.forEach((rcd) => {
        if (rcd.package_name === 'Basic') {
          this.basicDataSource = rcd
        }
        if (rcd.package_name === 'Standard') {
          this.standardDataSource = rcd
        }
        if (rcd.package_name === 'Premium') {
          this.premiumDataSource = rcd
        }
        if (rcd.package_name === 'Executive') {
          this.executiveDataSource = rcd
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
    changeTabHandler(key) {
      let price
      if (key === '1') {
        price = this.basicDataSource.amount
      }
      if (key === '2') {
        price = this.standardDataSource.amount
      }
      if (key === '3') {
        price = this.premiumDataSource.amount
      }
      if (key === '4') {
        price = this.executiveDataSource.amount
      }
      this.$emit('currentKeyHandler', key, price)
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
      getAllMedicalScreening: 'testsModule/GET_ALL_MEDICAL_SCREENING',
    }),
  },
}
</script>
