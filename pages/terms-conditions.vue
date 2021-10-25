<template>
  <div class="list flex">
    <div class="list__key hide-for-mobile">
      <ul>
        <li :class="{ active: key === 'introduction' }">
          <a @click="changePageHandler('introduction')">Introduction</a>
        </li>
        <li :class="{ active: key === 'status' }">
          <a @click="changePageHandler('status')">Your Status</a>
        </li>
        <li :class="{ active: key === 'effect' }">
          <a @click="changePageHandler('effect')">Effect</a>
        </li>
        <li :class="{ active: key === 'ourWebsite' }">
          <a @click="changePageHandler('ourWebsite')">Use of Our Website</a>
        </li>
        <li :class="{ active: key === 'registration' }">
          <a @click="changePageHandler('registration')">Online Registration</a>
        </li>
        <li :class="{ active: key === 'service' }">
          <a @click="changePageHandler('service')">The Services</a>
        </li>
        <li :class="{ active: key === 'purchaseService' }">
          <a @click="changePageHandler('purchaseService')"
            >Purchase of Services</a
          >
        </li>
        <li :class="{ active: key === 'priceTerms' }">
          <a @click="changePageHandler('priceTerms')"
            >Purchase Price and Payment Terms</a
          >
        </li>
        <li :class="{ active: key === 'fraud' }">
          <a @click="changePageHandler('fraud')">Fraud</a>
        </li>
        <li :class="{ active: key === 'security' }">
          <a @click="changePageHandler('security')">Security</a>
        </li>
        <li :class="{ active: key === 'privacyPersonalInformation' }">
          <a @click="changePageHandler('privacyPersonalInformation')"
            >Privacy and Personal Information</a
          >
        </li>
        <li :class="{ active: key === 'indemnityLimitation' }">
          <a @click="changePageHandler('indemnityLimitation')"
            >Indemnity and Limitation of Liability</a
          >
        </li>
        <li :class="{ active: key === 'governingLaw' }">
          <a @click="changePageHandler('governingLaw')"
            >Governing Law and Jurisdiction</a
          >
        </li>
        <li :class="{ active: key === 'disputes' }">
          <a @click="changePageHandler('disputes')">Disputes</a>
        </li>
        <li :class="{ active: key === 'notices' }">
          <a @click="changePageHandler('notices')">Notices</a>
        </li>
        <li :class="{ active: key === 'advertising' }">
          <a @click="changePageHandler('advertising')">Advertising</a>
        </li>
        <li :class="{ active: key === 'guarantee' }">
          <a @click="changePageHandler('guarantee')"
            >Guarantee and Complaints Mgt</a
          >
        </li>
        <li :class="{ active: key === 'intellectualProperty' }">
          <a @click="changePageHandler('intellectualProperty')"
            >Intellectual Property And Use Of Our...</a
          >
        </li>
        <li :class="{ active: key === 'termsDiscontinuation' }">
          <a @click="changePageHandler('termsDiscontinuation')"
            >Terms and Discontinuation</a
          >
        </li>
        <li :class="{ active: key === 'link' }">
          <a @click="changePageHandler('link')">Links</a>
        </li>
        <li :class="{ active: key === 'general' }">
          <a @click="changePageHandler('general')">General</a>
        </li>
        <li :class="{ active: key === 'disclaimer' }">
          <a @click="changePageHandler('disclaimer')">Disclaimer</a>
        </li>
        <li :class="{ active: key === 'corporateInfo' }">
          <a @click="changePageHandler('corporateInfo')"
            >Savon Nettoyage Corporate Info.</a
          >
        </li>
      </ul>
    </div>
    <div ref="top" class="list__details">
      <br />
      <h2>Terms and Conditions</h2>
      <p>Effective Date: Monday, May 17, 2021</p>
      <component
        :is="computedComponent"
        @changePageHandler="changePageHandler"
      ></component>
    </div>
  </div>
</template>
<script>
import AppIntroduction from '@/components/term-condition/AppIntroduction'
import AppStatus from '@/components/term-condition/AppStatus'
import AppEffect from '@/components/term-condition/AppEffect'
import AppUseOfOurWebsite from '@/components/term-condition/AppUseOfOurWebsite'
import AppOnlineRegistration from '@/components/term-condition/AppOnlineRegistration'
import AppServices from '@/components/term-condition/AppServices'
import AppPurchaseService from '@/components/term-condition/AppPurchaseService'
import AppPurchasePricePaymentTerms from '@/components/term-condition/AppPurchasePricePaymentTerms'
import AppFraud from '@/components/term-condition/AppFraud'
import AppSecurity from '@/components/term-condition/AppSecurity'
import AppPrivacyPersonalInformation from '@/components/term-condition/AppPrivacyPersonalInformation'
import AppIndemnityLimitationLiability from '@/components/term-condition/AppIndemnityLimitationLiability'
import AppGoverningLaw from '@/components/term-condition/AppGoverningLaw'
import AppDisputes from '@/components/term-condition/AppDisputes'
import AppNotices from '@/components/term-condition/AppNotices'
import AppAdvertising from '@/components/term-condition/AppAdvertising'
import AppGuaranteeComplaints from '@/components/term-condition/AppGuaranteeComplaints'
import AppIntellectualProperty from '@/components/term-condition/AppIntellectualProperty'
import AppTermsDiscontinuation from '@/components/term-condition/AppTermsDiscontinuation'
import AppLink from '@/components/term-condition/AppLink'
import AppGeneral from '@/components/term-condition/AppGeneral'
import AppDisclaimer from '@/components/term-condition/AppDisclaimer'
import AppCorporateInfo from '@/components/term-condition/AppCorporateInfo'

export default {
  components: {
    /* eslint-disable vue/no-unused-components */
    AppIntroduction,
    AppStatus,
    AppEffect,
    AppUseOfOurWebsite,
    AppOnlineRegistration,
    AppServices,
    AppPurchaseService,
    AppPurchasePricePaymentTerms,
    AppFraud,
    AppSecurity,
    AppPrivacyPersonalInformation,
    AppIndemnityLimitationLiability,
    AppGoverningLaw,
    AppDisputes,
    AppNotices,
    AppAdvertising,
    AppGuaranteeComplaints,
    AppIntellectualProperty,
    AppTermsDiscontinuation,
    AppLink,
    AppGeneral,
    AppDisclaimer,
    AppCorporateInfo,
  },
  data() {
    return {
      key: 'introduction',
    }
  },
  computed: {
    computedComponent() {
      if (this.key === 'status') {
        return 'AppStatus'
      }
      if (this.key === 'effect') {
        return 'AppEffect'
      }
      if (this.key === 'ourWebsite') {
        return 'AppUseOfOurWebsite'
      }
      if (this.key === 'registration') {
        return 'AppOnlineRegistration'
      }
      if (this.key === 'service') {
        return 'AppServices'
      }
      if (this.key === 'purchaseService') {
        return 'AppPurchaseService'
      }
      if (this.key === 'priceTerms') {
        return 'AppPurchasePricePaymentTerms'
      }
      if (this.key === 'fraud') {
        return 'AppFraud'
      }
      if (this.key === 'security') {
        return 'AppSecurity'
      }
      if (this.key === 'privacyPersonalInformation') {
        return 'AppPrivacyPersonalInformation'
      }
      if (this.key === 'indemnityLimitation') {
        return 'AppIndemnityLimitationLiability'
      }
      if (this.key === 'governingLaw') {
        return 'AppGoverningLaw'
      }
      if (this.key === 'disputes') {
        return 'AppDisputes'
      }
      if (this.key === 'notices') {
        return 'AppNotices'
      }
      if (this.key === 'advertising') {
        return 'AppAdvertising'
      }
      if (this.key === 'guarantee') {
        return 'AppGuaranteeComplaints'
      }
      if (this.key === 'intellectualProperty') {
        return 'AppIntellectualProperty'
      }
      if (this.key === 'termsDiscontinuation') {
        return 'AppTermsDiscontinuation'
      }
      if (this.key === 'link') {
        return 'AppLink'
      }
      if (this.key === 'general') {
        return 'AppGeneral'
      }
      if (this.key === 'disclaimer') {
        return 'AppDisclaimer'
      }
      if (this.key === 'corporateInfo') {
        return 'AppCorporateInfo'
      }
      return 'AppIntroduction'
    },
  },
  methods: {
    changePageHandler(key) {
      this.key = key
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      this.$refs.top.scrollTop = 0
    },
  },
}
</script>
<style lang="scss" scoped>
.list {
  border-top: 1px solid $purple;
  .active {
    opacity: 1;
  }
  &__key {
    background: rgba(146, 39, 143, 0.05);
    color: rgba(146, 39, 143, 1);
    width: 30%;
    // @include breakpoint-down(medium) {
    //   padding-left: 1.5rem;
    // }
    @include breakpoint-up(large) {
      padding-left: 5rem;
    }
    @include breakpoint-up(xxlarge) {
      padding-left: 7rem;
      width: 30%;
    }
    ul {
      margin: 3rem 0;
      list-style-type: none;
      li {
        position: relative;
        text-shadow: 0px 16px 21px rgba(0, 0, 0, 0.16);
        font-weight: bold;
        font-family: $RegularFont;
        margin-bottom: 2rem;
        opacity: 0.4;
        a {
          color: $purple;
        }
        &::before {
          content: '';
          position: absolute;
          left: -45px;
          border-radius: 100%;
          background-color: $purple;
          color: $white;
          padding: 0.1rem 0.6rem;
          font-weight: bold;
          @include breakpoint-up(large) {
            padding: 0.1rem 0.65rem;
            left: -4rem;
          }
          @include breakpoint-up(xxlarge) {
            padding: 0.1rem 0.8rem;
          }
        }
        &:first-child {
          &::before {
            content: '1';
          }
        }
        &:nth-child(2) {
          &::before {
            content: '2';
          }
        }
        &:nth-child(3) {
          &::before {
            content: '3';
          }
        }
        &:nth-child(4) {
          &::before {
            content: '4';
          }
        }
        &:nth-child(5) {
          &::before {
            content: '5';
          }
        }
        &:nth-child(6) {
          &::before {
            content: '6';
          }
        }
        &:nth-child(7) {
          &::before {
            content: '7';
          }
        }
        &:nth-child(8) {
          &::before {
            content: '8';
          }
        }
        &:nth-child(9) {
          &::before {
            content: '9';
          }
        }
        &:nth-child(10) {
          &::before {
            content: '10';
          }
        }
        &:nth-child(11) {
          &::before {
            content: '11';
          }
        }
        &:nth-child(12) {
          &::before {
            content: '12';
          }
        }
        &:nth-child(13) {
          &::before {
            content: '13';
          }
        }
        &:nth-child(14) {
          &::before {
            content: '14';
          }
        }
        &:nth-child(15) {
          &::before {
            content: '15';
          }
        }
        &:nth-child(16) {
          &::before {
            content: '16';
          }
        }
        &:nth-child(17) {
          &::before {
            content: '17';
          }
        }
        &:nth-child(18) {
          &::before {
            content: '18';
          }
        }
        &:nth-child(19) {
          &::before {
            content: '19';
          }
        }
        &:nth-child(20) {
          &::before {
            content: '20';
          }
        }
        &:nth-child(21) {
          &::before {
            content: '21';
          }
        }
        &:nth-child(22) {
          &::before {
            content: '22';
          }
        }
        &:last-child {
          &::before {
            content: '23';
          }
        }
      }
    }
  }
  &__details {
    margin-bottom: 4.125rem !important;
    @include breakpoint-down(medium) {
      padding-right: 1.5rem;
      padding-left: 1.5rem;
    }
    @include breakpoint-up(large) {
      width: 70%;
      padding-right: 7rem;
      padding-left: 4rem;
    }
    @include breakpoint-up(xxlarge) {
      width: 70%;
    }
  }
}
</style>
