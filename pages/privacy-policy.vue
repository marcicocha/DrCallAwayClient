<template>
  <div class="list flex">
    <div class="list__key hide-for-mobile">
      <ul>
        <li :class="{ active: key === 'introduction' }">
          <a @click="changePageHandler('introduction')">Introduction</a>
        </li>
        <li :class="{ active: key === 'personalInformation' }">
          <a @click="changePageHandler('personalInformation')"
            >Personal Information</a
          >
        </li>
        <li :class="{ active: key === 'periodicSurvey' }">
          <a @click="changePageHandler('periodicSurvey')">Periodic Survey</a>
        </li>
        <li :class="{ active: key === 'dataRight' }">
          <a @click="changePageHandler('dataRight')"
            >Data Confidentiality Rights</a
          >
        </li>
        <li :class="{ active: key === 'security' }">
          <a @click="changePageHandler('security')">Security</a>
        </li>
        <li :class="{ active: key === 'rightToOptOut' }">
          <a @click="changePageHandler('rightToOptOut')">Right to Opt Out</a>
        </li>
        <li :class="{ active: key === 'security' }">
          <a @click="changePageHandler('linkWebsites')"
            >Link to Other Websites</a
          >
        </li>
        <li :class="{ active: key === 'governingLaw' }">
          <a @click="changePageHandler('governingLaw')">Governing Law</a>
        </li>
        <li :class="{ active: key === 'cookies' }">
          <a @click="changePageHandler('cookies')">Cookies</a>
        </li>
      </ul>
    </div>
    <div ref="top" class="list__details">
      <h2>Privacy Policy</h2>
      <p>Effective Date: Monday, May 17, 2021</p>
      <component
        :is="computedComponent"
        @changePageHandler="changePageHandler"
      ></component>
    </div>
  </div>
</template>
<script>
import AppIntroduction from '@/components/privacy-policy/AppIntroduction'
import AppPersonalInformation from '@/components/privacy-policy/AppPersonalInformation'
import AppPeriodicSurvey from '@/components/privacy-policy/AppPeriodicSurvey'
import AppDataConfidentialityRights from '@/components/privacy-policy/AppDataConfidentialityRights'
import AppSecurity from '@/components/privacy-policy/AppSecurity'
import AppRightToOptOut from '@/components/privacy-policy/AppRightToOptOut'
import AppLinkWebsites from '@/components/privacy-policy/AppLinkWebsites'
import AppGoverningLaw from '@/components/privacy-policy/AppGoverningLaw'
import AppCookies from '@/components/privacy-policy/AppCookies'

export default {
  components: {
    /* eslint-disable vue/no-unused-components */
    AppIntroduction,
    AppPersonalInformation,
    AppPeriodicSurvey,
    AppDataConfidentialityRights,
    AppSecurity,
    AppRightToOptOut,
    AppLinkWebsites,
    AppGoverningLaw,
    AppCookies,
  },
  data() {
    return {
      key: 'introduction',
    }
  },
  computed: {
    computedComponent() {
      if (this.key === 'personalInformation') {
        return 'AppPersonalInformation'
      }
      if (this.key === 'periodicSurvey') {
        return 'AppPeriodicSurvey'
      }
      if (this.key === 'dataRight') {
        return 'AppDataConfidentialityRights'
      }
      if (this.key === 'security') {
        return 'AppSecurity'
      }
      if (this.key === 'rightToOptOut') {
        return 'AppRightToOptOut'
      }
      if (this.key === 'linkWebsites') {
        return 'AppLinkWebsites'
      }
      if (this.key === 'governingLaw') {
        return 'AppGoverningLaw'
      }
      if (this.key === 'cookies') {
        return 'AppCookies'
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
        margin-bottom: 2rem;
        font-family: $square721;
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
        &:last-child {
          &::before {
            content: '9';
          }
        }
      }
    }
  }
  &__details {
    width: 100%;
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
