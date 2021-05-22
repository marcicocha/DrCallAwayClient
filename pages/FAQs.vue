<template>
  <div>
    <div class="title">
      <h1>FAQs</h1>
    </div>
    <br />
    <div class="container" style="margin: 4rem 0">
      <AppAccordion
        v-for="faq in faqList"
        :key="faq.id"
        :heading="faq.title"
        :init-is-true="false"
        class="m-b"
      >
        <template slot="content">
          <p>{{ faq.description }}</p>
        </template>
      </AppAccordion>
    </div>
  </div>
</template>
<script>
import AppAccordion from '@/components/AppAccordion'

export default {
  components: {
    AppAccordion,
  },
  data() {
    return {
      faqList: [
        {
          title:
            'Can I choose to make an audio or video call to talk to a doctor?',
          description: 'Yes, you can choose any means to talk to a doctor',
        },
        {
          title: 'What hours of the day are doctors accessible?',
          description: 'Yes, you can choose any means to talk to a doctor',
        },
        {
          title: 'Can I change my subscription plan at any time?',
          description: 'Yes, you can choose any means to talk to a doctor',
        },
        {
          title:
            'How can I ascertain the authenticity of the medications and laboratory and diagnostic services provided by your partner pharmacies and diagnostic centers?',
          description: 'Yes, you can choose any means to talk to a doctor',
        },
        {
          title:
            'Who pays for the laboratory investigations sent to our partner diagnostic centers?',
          description: 'Yes, you can choose any means to talk to a doctor',
        },
        {
          title:
            'How does the doctor get my lab test result from the diagnostic center for follow-up consultation?',
          description: 'Yes, you can choose any means to talk to a doctor',
        },
        {
          title: 'How safe are my personal details and medical records online?',
          description: 'Yes, you can choose any means to talk to a doctor',
        },
        {
          title:
            'How do i pay for the prescribed medications sent to the pharmacy?',
          description: 'Yes, you can choose any means to talk to a doctor',
        },
        {
          title:
            'Do I need to pay extra besides my subscription plan in order to talk to any specialist in the DrCallAway Special Ailment service?',
          description: 'Yes, you can choose any means to talk to a doctor',
        },
        {
          title:
            'Can I choose to get my drugs and lab tests wherever I choose apart from your partner pharmacies and diagnostic centers?',
          description: 'Yes, you can choose any means to talk to a doctor',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.title {
  padding: 6rem 0;
  text-align: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('@/assets/images/faq/background.png');
  h1 {
    color: $white !important;
  }
}
</style>
