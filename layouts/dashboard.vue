<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div
        class="logo"
        :style="collapsed ? { margin: '1rem 0' } : { margin: '1rem' }"
      >
        <img
          v-if="collapsed"
          src="../assets/images/minimized-logo.png"
          alt="logo"
        />
        <img v-else src="../assets/images/logo.png" alt="logo" />
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        :default-selected-keys="['1']"
        style="margin-top: 2rem"
      >
        <template v-for="(menu, i) in clientMenu">
          <a-menu-item
            v-if="menu.children.length === 0"
            :key="String(i++)"
            :style="
              collapsed
                ? { padding: '0 16px !important' }
                : { padding: '0 0.5rem !important' }
            "
          >
            <a-icon type="user" />
            <span
              ><a class="menu_anchor" @click="goToPage(menu.path)">{{
                menu.name
              }}</a></span
            >
          </a-menu-item>
          <a-sub-menu v-if="menu.children.length !== 0" :key="String(i++)">
            <span slot="title"
              ><a-icon type="user" /><span style="margin-left: 5px">{{
                menu.name
              }}</span></span
            >
            <a-menu-item v-for="(child, j) in menu.children" :key="j">
              <span
                ><a @click="goToPage(child.path)">{{ child.name }}</a></span
              ></a-menu-item
            >
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout class="layout">
      <a-layout-header
        class="flex flex-jc-sb"
        style="
          background: #f7f8fa;
          padding: 0.875rem 0;
          border-bottom: 1px solid rgba(80, 90, 71, 0.59);
        "
      >
        <a-icon
          class="trigger"
          :type="collapsed ? 'arrow-right' : 'menu'"
          @click="() => (collapsed = !collapsed)"
        />
        <div class="hide-for-mobile">
          <AppHeader />
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 0',
          padding: '0',
          minHeight: '280px',
        }"
      >
        <Nuxt />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import AppHeader from '@/components/AppHeader'

export default {
  components: {
    AppHeader,
  },
  data() {
    return {
      collapsed: false,
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
  methods: {
    goToPage(path) {
      this.$router.replace(path)
    },
  },
}
</script>
<style lang="scss" scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
.menu_anchor {
  color: $medium-purple;
}
</style>
