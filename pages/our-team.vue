<template>
  <div class="container team">
    <h2>Meet The Team</h2>
    <p class="team__description">Our Board Of Directors</p>
    <br />
    <AppCard
      v-for="(team, i) in teamList"
      :key="i"
      class="flex flex-ai-c flex-jc-sb card"
    >
      <div class="card__image">
        <img :src="getImgHandler(team.imgSrc)" />
      </div>
      <div class="card__info">
        <h4>{{ team.title }}</h4>
        <p v-for="(description, m) in team.description" :key="m">
          {{ description }}
        </p>
      </div>
    </AppCard>
  </div>
</template>
<script>
import AppCard from '@/components/AppCard'
export default {
  components: { AppCard },
  data() {
    return {
      teamList: [
        {
          title: 'DR. BAMIDELE J. APAPA',
          description: [
            'Dr Bamidele J. Apapa is an Oral and Maxillofacial Surgeon and business consultant who runs a practice based in the United States of America.',
            'Dr Apapa is a member of many professional organisations in the United States as well as in Nigeria namely, American Association of Oral & Maxillofacial Surgeons in the USA, Ohio State Society of Oral & Maxillofacial Surgeons and West African College of Surgeons. He is also a Fellow of the American Dental Society of Anaesthesiology.',
            'He is a graduate of both College of Medicine, University of Lagos and New York University.Dr Apapa has numerous other business interests in Nigeria including Farewell Funeral Homes Limited, a public mortuary at the Isolo General Hospital in Lagos, and Maskil Consultants LLC, a consultancy firm which serves businesses both in the United States of America and in Nigeria.',
          ],
          imgSrc: 'bamidele.png',
        },
        {
          title: 'DR. ADETAYO OGUNNAIKE',
          description: [
            'Dr Adetayo “Ade” Ogunnaike is a 1980 graduate of the College of Medicine of the University of Lagos, Nigeria. He has lived and worked in Kaduna for many years and was the proprietor of Dalili Hospitals Limited.',
            'Although a trained medical practitioner, Dr Ogunnaike’s business acumen, diligence combined with hard work and excellence have seen him succeed in business for over 30 years. One of his notable business interests is Extras Nigeria Limited, a company he incorporated in 1986 that is reputable for supplying industrial cooling units and laundry equipment.',
            'He is currently a director of Farewell Funeral Homes Limited, a public mortuary at the Isolo General Hospital in Lagos, under a Public-Private-Partnership arrangement with the Lagos State Government.',
            'Dr Ogunnaike was responsible for rolling out the funeral home and leading all stages of the project, from conception to financing, building and equipping of the mortuary. Today, Farewell Funeral Homes is widely acknowledged as one of the best mortuaries in Nigeria.',
          ],
          imgSrc: 'adetayo.png',
        },
        {
          title: 'DR.TUNDE OLATINWO',
          description: [
            'Dr Tunde Olatinwo, MD is the Medical Director and Chief Executive Officer of Summit ObGyn of Natchitoches and a medical staff at Natchitoches Regional Medical Center both in Natchitoches, Louisiana, United States of America. He is also an Adjunct Associate Professor in the Department of Obstetrics and Gynaecology at Morehouse School of Medicine in Atlanta GA.',
            'He is a certified Obstetrician/Gynaecologist of the American Board of Obstetricians and Gynaecologists, the West African College of Surgeons, the American College of Obstetricians and Gynaecology, the American Society for the Study of Reproductive Medicine, the Endocrine Society and the Society for the Study of Reproduction.',
            'The major focus of Dr Olatinwo’s practice is to provide comprehensive health care to women of all ages, especially in the areas of Adolescent Gynaecology, Uro-gynaecology, Infertility Contraceptive Care, Menopausal Care, regular Prenatal Care and High-risk Obstetrics services utilizing evidence-based medical practice.',
            'Dr Olatinwo earned his medical degree from Ahmadu Bello University in Zaria, Nigeria. And thereafter completed a residency at State University of New York at Buffalo in Buffalo, N.Y, and was a Galloway Fellow at Memorial Sloan Kettering Cancer Center in New York, N.Y.',
            'In addition to his training in the United States, Dr Olatinwo also trained internationally with several fellowships including as a British Council Scholar at the University of Sheffield’s Department of Obstetrics and Gynaecology in Sheffield, England, and the West African College of Surgeons at Lagos University Teaching Hospital in Lagos, Nigeria.',
            'Dr Olatinwo has earned numerous honours and academic awards prior to establishing a private practice.',
          ],
          imgSrc: 'icon.png',
        },
        {
          title: 'MRS LIZZIE AMKPA',
          imgSrc: 'lizzie.png',
          description: [
            'Elizabeth “Lizzie” Amkpa is an experienced business leader and sales management specialist with vast experience in financial services, pay-television services and media.',
            'She has over 25 years impressive track record in corporate, commercial and retail selling, banking and finance, sales management, business negotiation, innovation and strategic planning - especially in the areas of marketing, business development and ‘Blue Ocean strategic thinking.’',
            'Lizzie was the General Manager for GOtv in Nigeria which she transformed into a household brand from 2012 to 2015. Prior to that, she was the National Head of Sales, MultiChoice Nigeria where she developed and implemented a sales strategy that drove DStv business growth exponentially within five years. She also had a three-and-half year stint at Econet Media where she served as General Manager, Kwese TV.',
            'She holds an MBA degree from the University of Sunderland, U.K and Management Program of Chinese-Europe International Business School (CEIBS).',
            'She currently sits on the board of Otb Media Limited and brings a wealth of experience in launching start-up operations and transforming them into sustainable businesses to Savon Nettoyage.',
          ],
        },
      ],
    }
  },
  methods: {
    getImgHandler(pic) {
      return require('~/assets/images/team/' + pic)
    },
  },
}
</script>
<style lang="scss" scoped>
h2 {
  text-align: center;
  // position: relative;
  // &::after {
  //   content: '';
  //   position: absolute;
  //   bottom: -1rem;
  //   left: 50%;
  //   transform: translateX(-50%);
  //   background: $purple;
  //   height: 2px;
  //   width: 5rem;
  // }
}
h4 {
  @include breakpoint-up(large) {
    margin-top: 0;
    margin-bottom: 1rem;
  }
}
.team {
  margin-bottom: 4.125rem !important;
  &__description {
    text-align: center;
  }
}
.card {
  margin-bottom: 2rem;
  &__image {
    width: 100%;
    img {
      width: 100%;
    }
    @include breakpoint-up(large) {
      width: 20%;
    }
  }
  &__info {
    width: 100%;
    @include breakpoint-up(large) {
      width: 75%;
    }
  }
}
</style>
