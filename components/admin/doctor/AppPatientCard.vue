<template>
  <div class="patient-card">
    <a-row type="flex" :gutter="24" align="middle">
      <a-col :span="12">
        <a-row type="flex" :gutter="24">
          <a-col :span="6">
            <div class="img-container">
              <img src="" alt="" />
            </div>
          </a-col>
          <a-col :span="18" class="text-container">
            <h6>{{ cardObj.patientName }}</h6>
            <p>
              {{ cardObj.issueDescription }}
            </p>
            <p>{{ cardObj.dateAdded }}</p>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="12">
        <a-row type="flex" :gutter="24" align="middle">
          <a-col :span="12" class="ailment-container">
            <p>Ailment</p>
            <p class="red">{{ cardObj.ailment }}</p>
          </a-col>
          <a-col :span="12">
            <a-row
              type="flex"
              :gutter="24"
              align="middle"
              class="patient-button"
            >
              <a-col :span="12">
                <AppButton
                  type="default"
                  class="admin-button"
                  @click="medicalInfoHandler"
                  >MEDICAL INFO</AppButton
                >
              </a-col>
              <a-col :span="12">
                <AppButton
                  type="primary"
                  class="admin-button"
                  @click="checkInHandler"
                  >CHECK IN</AppButton
                >
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import AppButton from '@/components/AppButton'

export default {
  name: 'AppPatientCard',
  components: {
    AppButton,
  },
  props: {
    cardObj: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    medicalInfoHandler() {
      this.$emit('medicalInfoHandler', this.cardObj)
    },
    checkInHandler() {
      this.$emit('checkInHandler', this.cardObj)
    },
  },
}
</script>
<style lang="scss" scoped>
.ailment-container {
  font-weight: bold;
  p {
    margin-bottom: 0.3rem;
  }
}
.patient-card {
  border-bottom: 2px solid rgba(53, 64, 82, 0.3);
  padding: 1.3rem 0;
  .text-container {
    h6 {
      margin-bottom: 0.3rem;
    }
    p {
      margin-bottom: 0.3rem;
    }
  }
}

.img-container {
  border: 5px solid $dark-purple;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
