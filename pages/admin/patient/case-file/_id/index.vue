<template>
  <div>
    <div>
      <nuxt-link to="/admin/patient/case-file"
        ><img src="@/assets/images/long-arrow-left.svg"
      /></nuxt-link>
    </div>
    <br />
    <div v-if="isLoading"></div>
    <div v-else>
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
      <AppCaseFileForm :current-case-file="currentCaseFile" status="patient" />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import AppCaseFileForm from '@/components/admin/patient/case-file/AppCaseFileForm'
import AppTitleDivider from '@/components/AppTitleDivider'

export default {
  components: { AppCaseFileForm, AppTitleDivider },
  layout: 'dashboard',
  data() {
    return {
      currentCaseFile: {},
      isLoading: true,
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
      this.isLoading = false
      this.currentCaseFile = data
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
  method: {
    ...mapActions({
      getCaseFileById: 'caseFileModule/GET_CASE_FILE_BY_ID',
    }),
  },
}
</script>
