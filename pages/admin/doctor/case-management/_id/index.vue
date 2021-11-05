<template>
  <div>
    <div v-if="!testIsVisible">
      <div>
        <nuxt-link to="/admin/doctor/case-management"
          ><img src="@/assets/images/long-arrow-left.svg"
        /></nuxt-link>
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
          @switchToCompleteTab="switchToCompleteTab"
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
      <AppScreeningTab
        :case-id="currentCaseFile.id"
        @closeTestHandler="closeTestHandler"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import AppCaseFileForm from '@/components/admin/patient/case-file/AppCaseFileForm'
import AppScreeningTab from '@/components/admin/doctor/case-file/AppScreeningTab'
import AppTitleDivider from '@/components/AppTitleDivider'

export default {
  components: { AppCaseFileForm, AppTitleDivider, AppScreeningTab },
  layout: 'dashboard',
  data() {
    return {
      currentCaseFile: {},
    }
  },
  async mounted() {
    try {
      const caseId = this.$route.params.id
      const user = JSON.parse(localStorage.getItem('user'))
      const config = {
        headers: { Authorization: `Bearer ${user.token.token}` },
      }
      const { data } = await this.$axios.$get(`cases/${caseId}`, config)
      this.currentCaseFile = data
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
  method: {
    closeTestHandler() {
      this.testIsVisible = false
    },
    switchToCompleteTab() {
      // this.activeKey = '2'
      // this.changeTabHandler('2')
    },
    showTestTab() {
      this.testIsVisible = true
    },
    ...mapActions({
      getCaseFileById: 'caseFileModule/GET_CASE_FILE_BY_ID',
    }),
  },
}
</script>
