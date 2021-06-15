<template>
  <aside
    :class="{
      menu: true,
      'menu__full-width': !minified,
      'menu__minimized-width': minified,
    }"
    style="overflow-y: scroll"
  >
    <div class="logo">
      <img
        v-if="minified"
        src="../assets/images/minimized-logo.png"
        alt="logo"
        style="width: 40px; height: 37px; object-fit: contain"
      />
      <img
        v-else
        src="../assets/images/logo.png"
        alt="logo"
        style="width: 150px; height: 57px; object-fit: contain"
      />
    </div>
    <br />
    <ul v-if="!minified" class="menu-list">
      <li v-for="(menu, index) in clientMenu" :key="index">
        <p class="menu_p-container">
          <a class="menu_anchor" @click="goToPage(menu.path, menu.children)">{{
            menu.name
          }}</a>
        </p>
        <ul
          v-if="
            menu.children.length !== 0 &&
            childMenuIsVisible &&
            parentPath === menu.path
          "
          class="menu-children"
        >
          <li v-for="(child, i) in menu.children" :key="i">
            <p>
              <a @click="goToPage(child.path, child.children)">{{
                child.name
              }}</a>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <br />
    <p>DOCTOR</p>
    <ul v-if="!minified" class="menu-list">
      <li v-for="(menu, index) in doctorMenu" :key="index">
        <p class="menu_p-container">
          <a class="menu_anchor" @click="goToPage(menu.path, menu.children)">{{
            menu.name
          }}</a>
        </p>
        <ul
          v-if="
            menu.children.length !== 0 &&
            childMenuIsVisible &&
            parentPath === menu.path
          "
          class="menu-children"
        >
          <li v-for="(child, i) in menu.children" :key="i">
            <p>
              <a @click="goToPage(child.path, child.children)">{{
                child.name
              }}</a>
            </p>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>
<script>
export default {
  name: 'AppSideBar',
  components: {},
  props: {
    minified: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      childMenuIsVisible: false,
      parentPath: '',
      clientMenu: [
        {
          key: 'dashboard',
          name: 'Dashboard',
          path: '/admin/patient',
          children: [],
        },
        {
          key: 'medical_information',
          name: 'Medical Information',
          path: '/admin/patient/medical-information',
          children: [],
        },
        {
          key: 'case_file',
          name: 'My Case File',
          path: '/admin/patient/case-file',
          children: [],
        },
        {
          key: 'appointment',
          name: 'Appointments',
          path: '/admin/patient/appointment',
          children: [],
        },
        {
          key: 'prescriptions',
          name: 'Prescriptions/Tests',
          path: '/admin/patient/prescriptions-test',
          children: [],
        },
        {
          key: 'key_services',
          name: 'Key Services',
          path: '/admin/patient/key-services',
          children: [
            {
              key: 'consultation',
              name: 'Consultation',
              path: '/admin/patient/key-services/consultation',
              children: [],
            },
            {
              key: 'book_appointment',
              name: 'Book an Appointment',
              path: '/admin/patient/key-services/book-appointment',
              children: [],
            },
            {
              key: 'wellness_nutrition',
              name: 'Wellness & Nutrition',
              path: '/admin/patient/key-services/wellness-nutrition',
              children: [],
            },
            {
              key: 'home_care',
              name: 'Home Care',
              path: '/admin/patient/key-services/home-care',
              children: [],
            },
          ],
        },
        {
          key: 'ambulance',
          name: 'Request An Ambulance',
          path: '/admin/patient/request-ambulance',
          children: [],
        },
        {
          key: 'self_service',
          name: 'Self Service',
          path: '/admin/patient/self-service',
          children: [
            {
              key: 'subscribe',
              name: 'Susbcribe',
              path: '/admin/patient/self-service/subscribe',
              children: [],
            },
            {
              key: 'helpdesk',
              name: 'Helpdesk',
              path: '/admin/patient/self-service/helpdesk',
              children: [],
            },
          ],
        },
      ],
      doctorMenu: [
        {
          key: 'dashboard',
          name: 'Dashboard',
          path: '/admin/doctor',
          children: [],
        },
        {
          key: 'waiting-room',
          name: 'Waiting Room',
          path: '/admin/doctor/waiting-room',
          children: [],
        },
        {
          key: 'case-management',
          name: 'Case Management',
          path: '/admin/doctor/case-management',
          children: [],
        },
        {
          key: 'appointment',
          name: 'Appointments',
          path: '/admin/doctor/appointment',
          children: [],
        },
        {
          key: 'self_service',
          name: 'Self Service',
          path: '/admin/patient/self-service',
          children: [
            {
              key: 'helpdesk',
              name: 'Helpdesk',
              path: '/admin/patient/self-service/helpdesk',
              children: [],
            },
          ],
        },
      ],
    }
  },
  computed: {
    menuList() {
      const menu = []
      return menu
    },
  },
  watch: {},
  methods: {
    showChangePassword() {
      this.$emit('showChangePasswordModal')
    },
    async logOutMethod() {
      const user = JSON.parse(localStorage.getItem('user'))

      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      }
      // clear local storage regardless
      localStorage.clear()
      // route back to home
      this.$router.push('/')
      try {
        await this.$axios.$post('/jwt/sign_out', {}, config)
        // clear local storage
        localStorage.clear()
        // route back to home
        this.$router.push('/')
      } catch (err) {
        // clear local storage
        localStorage.clear()
        // route back to home
        this.$router.push('/')
        this.isLoading = false
        // Network Error

        // still clear local storage regardless as the user has requested to logout
        localStorage.clear()
        // route back to home
        this.$router.push('/')
      }
    },
    goToPage(path, children) {
      if (children.length === 0) {
        this.$router.replace(path)
        this.childMenuIsVisible = false
      } else {
        this.childMenuIsVisible = true
        this.parentPath = path
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.menu {
  height: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  transition: all 0.8s cubic-bezier(0.55, 0, 0.1, 1);
  background: white;
  padding: 0.5rem 1rem;
  z-index: 10;
  &__full-width {
    width: 230px;
    @include breakpoint-up(xxlarge) {
      width: 300px;
    }
  }
  &__minimized-width {
    width: 80px;
    @include breakpoint-up(xxlarge) {
      width: 120px;
    }
  }
  .logo {
    text-align: center;
    img {
      width: 30px;
    }
  }
  .menu-list {
    list-style-type: none;
    padding-left: 0;
    li {
      margin-bottom: 0.3rem;
      .menu_p-container {
        padding: 8px;
        border-radius: 10px;
      }
      a {
        color: $purple;
      }
    }
  }
  .menu-children {
    list-style-type: none;
    padding-left: 0;
    li {
      margin-bottom: 0.2rem;
      p {
        padding: 8px;
        border-radius: 10px;
        a {
          color: $purple;
        }
      }
    }
  }
  .menu-list li:hover {
    .menu_p-container {
      background: $medium-purple;
      opacity: 1;
    }
    .menu_anchor {
      color: #fff;
    }
  }
  .menu-children li:hover {
    p {
      background: $medium-purple;
      opacity: 0.7;
      a {
        color: #fff;
      }
    }
  }
}
</style>
