<template>
  <div>
    <AppPrescription />
    <br />
    <AppTest />
  </div>
</template>
<script>
import AppTest from '@/components/admin/patient/precription-test/AppTest'
import AppPrescription from '@/components/admin/patient/precription-test/AppPrescription'

export default {
  components: {
    AppTest,
    AppPrescription,
  },
  layout: 'dashboard',
  data() {
    return {
      activeKey: '1',
      filterObj: {},
      dataSource1: [
        {
          caseId: '#000001',
          consultantName: 'Dr. Michael Sanwo-Olu',
          complaint: 'Malaria and Typhoid',
          dateAdded: '23rd March, 2021',
          status: 'Pending',
        },
      ],
      dataSource2: [
        {
          caseId: '#000001',
          consultantName: 'Dr. Michael Sanwo-Olu',
          complaint: 'Malaria and Typhoid',
          dateAdded: '23rd March, 2021',
          status: 'Active',
        },
      ],
      dataSource3: [
        {
          caseId: '#000002',
          consultantName: 'Dr. Michael Sanwo-Olu',
          complaint: 'Malaria and Typhoid',
          dateAdded: '23rd March, 2021',
          status: 'Completed',
        },
      ],
    }
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
