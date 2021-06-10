<template>
  <div>
    <a-row type="flex" :gutter="24">
      <a-col>
        <AppDashboardCard :card-obj="item" color="#641C62" />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import AppDashboardCard from '@/components/AppDashboardCard'

export default {
  components: { AppDashboardCard },
  layout: 'dashboard',
  data() {
    return {
      card1: {
        firstText: 'Consultation for',
        secondText: 'General ailments',
        imgSrc: 'admin/2.png',
      },
    }
  },
}
</script>
