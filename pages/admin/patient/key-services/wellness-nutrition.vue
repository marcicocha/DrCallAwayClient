<template>
  <div>
    <a-row type="flex" :gutter="24">
      <a-col v-for="(card, j) in wellnessList" :key="j" :span="12">
        <AppDashboardCard
          :card-obj="card"
          :color="card.color"
          @click="showModalhandler(card.key)"
          style="margin-bottom: 2rem"
        />
      </a-col>
    </a-row>
    <a-modal
      :visible="modalIsVisible"
      width="420px"
      :confirm-loading="confirmLoading"
      :footer="null"
      :destroy-on-close="true"
      :mask-style="{ background: 'rgba(61, 12, 60, 0.9)' }"
      centered
      @cancel="closeModal"
    >
      <div>
        <h6 class="t-c">{{ modalTitle }}</h6>
        <a-divider />
        <div></div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import AppDashboardCard from '@/components/AppDashboardCard'

export default {
  components: {
    AppDashboardCard,
  },
  layout: 'dashboard',
  data() {
    return {
      modalIsVisible: false,
      screenIsVisible: false,
      confirmLoading: false,
      wellnessKey: false,
      wellnessList: [
        {
          key: 'screening',
          firstText: 'Request annual',
          secondText: 'MEDICAL SCREENING',
          imgSrc: 'admin/2.png',
          color: '#641C62',
        },
        {
          key: 'nutritionist',
          firstText: 'Talk to a',
          secondText: 'NUTRITIONIST',
          imgSrc: 'admin/2.png',
          color: '#BB58B6',
        },
        {
          key: 'dentist',
          firstText: 'Request a',
          secondText: 'DENTIST',
          imgSrc: 'admin/2.png',
          color: '#BB58B6',
        },
        {
          key: 'optical',
          firstText: 'Request an',
          secondText: 'OPTICAL SERVICE',
          imgSrc: 'admin/2.png',
          color: '#641C62',
        },
      ],
    }
  },
  computed: {
    modalTitle() {
      if (this.wellnessKey === 'nutritionist') {
        return 'Talk to a Nutritionist'
      }
      if (this.wellnessKey === 'dentist') {
        return 'Request a Dentist'
      }
      return 'Request an Optical Service'
    },
  },
  methods: {
    showModalhandler(key) {
      if (key !== 'screening') {
        this.modalIsVisible = true
        this.wellnessKey = key
      } else {
        this.screenIsVisible = true
      }
    },
    closeModal() {
      this.modalIsVisible = false
    },
  },
}
</script>
