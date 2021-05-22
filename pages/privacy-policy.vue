<template>
  <div class="list flex">
    <div class="list__key hide-for-mobile">
      <ol>
        <li>Introduction</li>
        <li>Personal Information</li>
        <li>Periodic Survey</li>
        <li>Data Confidentiality Rights</li>
        <li>Security</li>
        <li>Right to Opt Out</li>
        <li>Link to Other Websites</li>
        <li>Governing Law</li>
        <li>Cookies</li>
      </ol>
    </div>
    <div class="list__details">
      <h2>Privacy Policy</h2>
      <p>Effective Date: Monday, May 17, 2021</p>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.list {
  &__key {
    background: rgba(146, 39, 143, 0.05);
    color: rgba(146, 39, 143, 1);
    width: 30%;
    @include breakpoint-down(medium) {
      padding-left: 1.5rem;
    }
    @include breakpoint-up(large) {
      padding-left: 7rem;
    }
    ol {
      margin: 3rem 0;
      li {
        text-shadow: 0px 16px 21px rgba(0, 0, 0, 0.16);
        font-weight: bold;
        margin-bottom: 2rem;
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
    }
  }
}
</style>
