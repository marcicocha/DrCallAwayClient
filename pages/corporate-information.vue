<template>
  <div class="corporate-container">
    <div class="title">
      <h1>Corporate Information</h1>
    </div>
    <section class="container flex savon">
      <div class="column-6 savon__image">
        <img src="@/assets/images/corporate/savon.png" alt="savon image" />
      </div>
      <div class="column-6 savon__description">
        <h5>Who We Are</h5>
        <p>
          Savon Nettoyage Nigeria Limited (SNNL) is a telehealth company that
          manages the DrCallAwayTM service in Nigeria. The company was founded
          in 2020 to provide affordable and quality healthcare services to
          individuals, small to medium sized business owners and a large
          informal sector, irrespective of any Health Insurance scheme or Health
          Management Organization one is registered with.
        </p>
        <p>
          Savon Nettoyage Nigeria Limited (SNNL) is run by respected and highly
          experienced medical practitioners and business leaders, who have all
          excelled in various fields of endeavour. Through the DrCallAwayTM
          platform, families will be healthier, and challenges of
          self-medication and misdiagnosis will be greatly minimized.
        </p>
      </div>
    </section>
    <section class="container">
      <div class="t-c vision">
        <h5>Our Vision</h5>
        <p>
          To provide convenient access and linkages to general and specialist
          healthcare services through digital platforms to all categories of
          people.
        </p>
      </div>
      <br />
      <div class="values">
        <h5>Our Values</h5>
        <div class="flex flex-jc-sb">
          <div class="values__image">
            <img
              src="@/assets/images/corporate/blood-pressure.png"
              alt="blood pressure test"
            />
          </div>
          <div class="flex flex-wrap flex-jc-sb values__text">
            <div v-for="(value, i) in valueList" :key="i">
              <h6>{{ value.title }}</h6>
              <p>{{ value.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      valueList: [
        {
          title: 'Care',
          description:
            'Our qualified team of physicians are bound by a duty of care and driven by a commitment to serve humanity.',
        },
        {
          title: 'Accessibility',
          description:
            'Our Integration of modern technology with primary healthcare gives all categories of people, however remote, round- the-clock access to affordable and quality healthcare services.',
        },
        {
          title: 'Reliability',
          description:
            'Because of the experience of our doctors and the integrity of our systems, you can be rest assured that you are in safe hands.',
        },
        {
          title: 'Mutual Respect',
          description:
            'We believe in mutual respect. Our doctors are cordial, show empathy and treat patients with utmost professionalism.',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.corporate-container {
  margin-bottom: 4.125rem !important;
}
.title {
  padding: 6rem 0;
  text-align: center;
  background-color: rgba(61, 12, 60, 0.85);
  background-size: cover;
  background-repeat: no-repeat;
  background-blend-mode: darken;
  background-image: url('@/assets/images/corporate/background.png');
  h1 {
    color: $white !important;
  }
}
.savon {
  margin: 4rem 0;
  @include breakpoint-up(large) {
    margin-top: 6rem;
  }
  &__image {
    @include breakpoint-up(large) {
      margin-right: 2rem;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  &__description {
    h5 {
      color: $purple;
      font-weight: bold;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: 0rem;
        left: 0;
        background: $purple;
        height: 2.5px;
        width: 5rem;
      }
      @include breakpoint-up(large) {
        margin-top: 0;
      }
    }
  }
}
.vision {
  h5 {
    margin-bottom: 0;
    color: $purple;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      background: $purple;
      height: 2.5px;
      width: 4rem;
    }
  }
  p {
    font-weight: bold;
  }
}
.values {
  h5 {
    position: relative;
    margin-bottom: 0;
    color: $purple;
    &::before {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      background: $purple;
      height: 2.5px;
      width: 4rem;
    }
  }
  &__text {
    order: 1;
    @include breakpoint-up(large) {
      width: 50%;
    }
    h6 {
      margin-bottom: 0.8rem;
      margin-top: 1.5rem;
    }
    p {
      margin-top: 0rem;
    }
    div {
      width: 48%;
    }
  }

  &__image {
    order: 2;

    @include breakpoint-down(medium) {
      margin-top: 2rem;
    }
    @include breakpoint-up(large) {
      margin-right: 3rem;
      width: 43%;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
