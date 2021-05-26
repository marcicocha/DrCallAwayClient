<template>
  <div class="list flex">
    <div class="list__key hide-for-mobile">
      <ul>
        <li>Introduction</li>
        <li>Your Status</li>
        <li>Effect</li>
        <li>Use of Our Website</li>
        <li>Online Registration</li>
        <li>The Services</li>
        <li>Purchase of Services</li>
        <li>Purchase Price and Payment Terms</li>
        <li>Fraud</li>
        <li>Security</li>
        <li>Privacy and Personal Information</li>
        <li>Indemnity and Limitation of Liability</li>
        <li>Governing Law and Jurisdiction</li>
        <li>Disputes</li>
        <li>Notices</li>
        <li>Advertising</li>
        <li>Guarantee and Complaints Mgt</li>
        <li>Intellectual Property And Use Of Our...</li>
        <li>Terms and Discontinuation</li>
        <li>Links</li>
        <li>General</li>
        <li>Disclaimer</li>
        <li>Savon Nettoyage Corporate Info.</li>
      </ul>
    </div>
    <div class="list__details">
      <h2>Terms and Conditions</h2>
      <p>Effective Date: Monday, May 17, 2021</p>
      <br />
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.list {
  border-top: 1px solid $purple;
  &__key {
    background: rgba(146, 39, 143, 0.05);
    color: rgba(146, 39, 143, 1);
    width: 30%;
    // @include breakpoint-down(medium) {
    //   padding-left: 1.5rem;
    // }
    @include breakpoint-up(large) {
      padding-left: 7rem;
    }
    ul {
      margin: 3rem 0;
      list-style-type: none;
      li {
        position: relative;
        text-shadow: 0px 16px 21px rgba(0, 0, 0, 0.16);
        font-weight: bold;
        margin-bottom: 2rem;
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
    @include breakpoint-down(medium) {
      padding-right: 1.5rem;
      padding-left: 1.5rem;
    }
    @include breakpoint-up(large) {
      padding-right: 7rem;
      padding-left: 4rem;
    }
  }
}
</style>
