<template>
  <div>
    <AppCaseFileForm :current-case-file="currentCaseFile" status="patient" />
  </div>
</template>
<script>
import AppCaseFileForm from '@/components/admin/patient/case-file/AppCaseFileForm'

export default {
  components: { AppCaseFileForm },
  data() {
    return {
      currentCaseFile: {},
    }
  },
}
</script>
