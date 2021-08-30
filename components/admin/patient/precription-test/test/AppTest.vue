<template>
  <div>
    <h6>TESTS</h6>
    <AppTabs v-model="activeKey" @tabClick="changeTabHandler">
      <template slot="default">
        <a-tab-pane key="1" tab="Pending Tests" force-render>
          <AppTestDataTable
            :data-source="allTests"
            @showTestModal="showTestModal"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Completed Test">
          <AppTestDataTable
            :data-source="allTests"
            @showTestModal="showTestModal"
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
    <a-modal
      :visible="testModalIsVisible"
      width="500px"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
      centered
      @cancel="closeModal"
    >
      <div>
        <h6 class="t-c">Test for Case {{ currentTestObj.case_file_id }}</h6>
        <a-divider />
        <AppTestForm :current-test-obj="currentTestObj" />
      </div>
    </a-modal>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import AppTabs from '@/components/AppTabs'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppTestDataTable from '@/components/admin/patient/precription-test/test/AppTestDataTable'
import AppTestForm from '@/components/admin/patient/precription-test/test/AppTestForm'

export default {
  name: 'AppTest',
  components: {
    AppTabs,
    AppInput,
    AppSelect,
    AppTestDataTable,
    AppTestForm,
  },
  data() {
    return {
      activeKey: '1',
      filterObj: {},
      testModalIsVisible: false,
      confirmLoading: false,
      currentTestObj: {},
      status: 'PENDING',
    }
  },
  computed: {
    ...mapState({
      allTests: (state) => state.testsModule.tests,
    }),
  },
  mounted() {
    this.changeTabHandler('1')
  },
  methods: {
    showTestModal(record) {
      this.testModalIsVisible = true
      this.currentTestObj = record
    },
    async changeTabHandler(key) {
      if (key === '1') {
        this.status = 'PENDING'
      }
      if (key === '2') {
        this.status = 'COMPLETED'
      }
      try {
        const obj = {
          ...this.filterObj,
          status: this.status,
        }
        await this.getAllTests(obj)
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
    closeModal() {
      this.testModalIsVisible = false
    },
    ...mapActions({
      getAllTests: 'testsModule/GET_TESTS',
    }),
  },
}
</script>
<style lang="scss" scoped>
.right-info {
  position: absolute;
  right: 0;
  top: 0;
  width: 35%;
}
h6 {
  color: $dark-purple;
}
</style>
