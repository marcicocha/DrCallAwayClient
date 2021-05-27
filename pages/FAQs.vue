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
          description: 'Yes, you can choose any means to talk to a doctor.',
        },
        {
          title: 'What hours of the day are doctors accessible?',
          description: 'The doctors are accessible 24/7.',
        },
        {
          title: 'Can I change my subscription plan at any time?',
          description: 'Yes, you can change your subscription at any time.',
        },
        {
          title:
            'How can I ascertain the authenticity of the medications and laboratory and diagnostic services provided by your partner pharmacies and diagnostic centers?',
          description:
            'DrCallAway has partnerships with reputable firms, hence the authenticity of the medicines and services are verified and top notch.',
        },
        {
          title:
            'Who pays for the laboratory investigations sent to our partner diagnostic centers?',
          description:
            'The laboratory investigations costs are catered for by the subscriber. It is devoid of the subscription fee.',
        },
        {
          title:
            'How does the doctor get my lab test result from the diagnostic center for follow-up consultation?',
          description:
            'The result of any lab test done is forwarded to the doctor by the diagnostic center and uploaded on the subscriber’s case file thereafter.',
        },
        {
          title: 'How safe are my personal details and medical records online?',
          description:
            'All personal details and medical records are safely secured',
        },
        {
          title:
            'How do i pay for the prescribed medications sent to the pharmacy?',
          description:
            'Payment for prescribed medicines are paid via the DrCallAway app.',
        },
        {
          title:
            'Do I need to pay extra besides my subscription plan in order to talk to any specialist in the DrCallAway Special Ailment service?',
          description:
            'Yes, subscription does not cover the cost to talk to any specialist in the DrCallAway Special Ailment Service',
        },
        {
          title:
            'Can I choose to get my drugs and lab tests wherever I choose apart from your partner pharmacies and diagnostic centers?',
          description:
            'Yes, a subscriber can choose to opt out and get his medicines outside our partners pharmacies, as well as his lab tests.',
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
