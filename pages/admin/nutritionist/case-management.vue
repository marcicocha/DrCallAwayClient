<template>
  <div>
    <AppTabs
      v-if="!viewIsVisible"
      v-model="activeKey"
      @tabClick="changeTabHandler"
    >
      <template slot="default">
        <a-tab-pane key="1" tab="Active Cases" force-render>
          <AppCaseFileDataTable
            status="ACTIVE"
            :data-source="allCaseFiles"
            @showCaseFile="showCaseFile"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Completed Cases">
          <AppCaseFileDataTable
            status="COMPLETED"
            :data-source="allCaseFiles"
            @showCaseFile="showCaseFile"
          />
        </a-tab-pane>
      </template>
      <template slot="rightInfo">
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
    <div v-if="viewIsVisible">
      <div v-if="!testIsVisible">
        <div>
          <a @click="closeViewHandler('case')"
            ><img src="@/assets/images/long-arrow-left.svg"
          /></a>
        </div>
        <br />
        <AppTitleDivider :title="`Case File / ${currentCaseFile.case_id}`"
          ><span class="right-details"
            ><span style="color: $dark-purple">Status:</span>
            <span
              :class="{
                blue: currentCaseFile.status === 'ACTIVE',
                green: currentCaseFile.status === 'COMPLETED',
                red: currentCaseFile.status === 'PENDING',
              }"
              >{{ currentCaseFile.status }}</span
            ></span
          ></AppTitleDivider
        >
        <div>
          <AppCaseFileForm
            :current-case-file="currentCaseFile"
            status="doctor"
            @showTestTab="showTestTab"
          />
        </div>
      </div>
      <div v-else>
        <div>
          <a @click="closeViewHandler('test')"
            ><img src="@/assets/images/long-arrow-left.svg"
          /></a>
        </div>
        <br />
        <AppScreeningTab />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import AppTabs from '@/components/AppTabs'
import AppInput from '@/components/AppInput'
import AppSelect from '@/components/AppSelect'
import AppCaseFileDataTable from '@/components/admin/patient/case-file/AppCaseFileDataTable.vue'
import AppCaseFileForm from '@/components/admin/patient/case-file/AppCaseFileForm'
import AppScreeningTab from '@/components/admin/patient/key-service/wellness-nutrition/AppScreeningTab'

export default {
  components: {
    AppTabs,
    AppInput,
    AppSelect,
    AppCaseFileDataTable,
    AppCaseFileForm,
    AppScreeningTab,
  },
  layout: 'dashboard',
  data() {
    return {
      activeKey: '1',
      filterObj: {},
      viewIsVisible: false,
      currentCaseFile: {},
      isReadOnly: true,
      testIsVisible: false,
      status: 'ACTIVE',
    }
  },
  computed: {
    ...mapState({
      allCaseFiles: (state) => state.caseFileDoctorModule.caseFiles,
    }),
  },
  mounted() {
    this.changeTabHandler('1')
  },
  methods: {
    showCaseFile(record) {
      this.viewIsVisible = true
      this.currentCaseFile = record
    },
    closeViewHandler(key) {
      if (key === 'case') {
        this.viewIsVisible = false
      }
      if (key === 'test') {
        this.testIsVisible = false
      }
    },
    async changeTabHandler(key) {
      if (key === '1') {
        this.status = 'ACTIVE'
      }
      if (key === '2') {
        this.status = 'COMPLETED'
      }
      try {
        const obj = {
          ...this.filterObj,
          status: this.status,
        }
        await this.getAllCaseFile(obj)
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
    showTestTab() {
      this.testIsVisible = true
    },
    ...mapActions({
      getAllCaseFile: 'caseFileNutritionistModule/GET_NUTRITIONIST_CASE_FILE',
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
</style>
