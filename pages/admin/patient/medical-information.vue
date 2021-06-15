<template>
  <div class="admin-wrapper">
    <AppHealthInformationForm />
  </div>
</template>
<script>
import AppHealthInformationForm from '@/components/admin/AppHealthInformationForm'
export default {
  components: {
    AppHealthInformationForm,
  },
  layout: 'dashboard',
}
</script>
