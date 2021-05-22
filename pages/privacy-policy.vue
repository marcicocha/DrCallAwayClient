<template>
  <div class="list flex">
    <div class="list__key hide-for-mobile">
      <ul>
        <li>Introduction</li>
        <li>Personal Information</li>
        <li>Periodic Survey</li>
        <li>Data Confidentiality Rights</li>
        <li>Security</li>
        <li>Right to Opt Out</li>
        <li>Link to Other Websites</li>
        <li>Governing Law</li>
        <li>Cookies</li>
      </ul>
    </div>
    <div class="list__details">
      <h2>Privacy Policy</h2>
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
        &:last-child {
          &::before {
            content: '9';
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
