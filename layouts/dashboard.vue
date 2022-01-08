<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      v-model="collapsed"
      :trigger="null"
      collapsible
      :width="230"
      style="overflow-y: auto"
    >
      <div
        class="logo"
        :style="collapsed ? { margin: '1rem 0' } : { margin: '1rem' }"
      >
        <nuxt-link to="/">
          <img
            v-if="collapsed"
            src="../assets/images/minimized-logo.png"
            alt="logo"
          />
          <img v-else src="../assets/images/logo.png" alt="logo" />
        </nuxt-link>
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        :default-selected-keys="['0']"
        :open-keys.sync="openKeys"
        style="margin-top: 2rem"
      >
        <template v-for="(menu, i) in menuList">
          <a-menu-item
            v-if="menu.children.length === 0"
            :key="String(i)"
            :style="
              collapsed
                ? { padding: '0 16px !important' }
                : { padding: '0 0.5rem !important' }
            "
            :class="{
              selected: checkPathHandler(menu.path, `${String(i)}`),
            }"
          >
            <span>
              <a-icon :type="menu.icon" />
              <span style="margin-left: 5px"
                ><a class="menu_anchor" @click="goToPage(menu.path)">{{
                  menu.name
                }}</a></span
              ></span
            >
          </a-menu-item>
          <a-sub-menu
            v-if="menu.children.length !== 0"
            :key="`Sub${String(i)}`"
            :class="{
              selected: key === `Sub${String(i)}`,
            }"
            @titleClick="titleClickHandler(`Sub${String(i)}`)"
          >
            <span slot="title"
              ><a-icon :type="menu.icon" /><span style="margin-left: 10px">{{
                menu.name
              }}</span></span
            >
            <a-menu-item
              v-for="(child, j) in menu.children"
              :key="j"
              :class="{
                selected: checkPathHandler(child.path, `Sub${String(i)}`),
              }"
            >
              <span
                ><a @click="goToPage(child.path)">{{ child.name }}</a></span
              ></a-menu-item
            >
          </a-sub-menu>
        </template>
        <a-menu-item class="bottom-menu">
          <a-icon type="logout" />
          <span style="margin-left: 5px"
            ><a class="menu_anchor" @click="logoutHandler">Logout</a></span
          >
        </a-menu-item>
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
          'overflow-y': 'auto',
          'padding-right': '1rem',
        }"
      >
        <Nuxt />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { mapState } from 'vuex'
import AppHeader from '@/components/AppHeader'
import {
  clientMenu,
  doctorMenu,
  ambulanceMenu,
  nurseMenu,
  pharmacyMenu,
  nutritionistMenu,
  diagnosticMenu,
} from '@/menu.json'

export default {
  components: {
    AppHeader,
  },
  data() {
    const user = JSON.parse(localStorage.getItem('user'))
    const role = user.roles[0].name

    return {
      collapsed: false,
      userObject: {},
      menuList: [],
      key: '',
      openKeys: [],
      subMenuTrue: false,
      doctorMenu,
      clientMenu,
      ambulanceMenu,
      nurseMenu,
      pharmacyMenu,
      nutritionistMenu,
      diagnosticMenu,
      user,
      role,
    }
  },
  computed: {
    ...mapState({
      allSubscription: (state) => state.subscriptionModule.subscriptionObj,
    }),
  },
  mounted() {
    if (this.role === 'doctor') {
      this.menuList = [...doctorMenu]
      return
    }
    if (this.role === 'ambulance') {
      this.menuList = [...ambulanceMenu]
      return
    }
    if (this.role === 'nurse') {
      this.menuList = [...nurseMenu]
      return
    }
    if (this.role === 'pharmacy') {
      this.menuList = [...pharmacyMenu]
      return
    }
    if (this.role === 'nutritionist') {
      this.menuList = [...nutritionistMenu]
      return
    }
    if (this.role === 'diagnostic') {
      this.menuList = [...diagnosticMenu]
      return
    }
    this.menuList = [...clientMenu]
  },
  methods: {
    async logoutHandler() {
      try {
        const config = {
          headers: { Authorization: `Bearer ${this.user.token.token}` },
        }
        await this.$axios.$post('logout', {}, config)
        this.$router.replace('/')
        localStorage.clear()
      } catch (err) {
        const { default: errorHandler } = await import('@/utils/errorHandler')
        errorHandler(err).forEach((msg) => {
          this.$notification.error({
            message: 'Error',
            description: msg,
            duration: 4000,
          })
        })
      }
    },
    goToPage(path) {
      if (this.role === 'patient' && !this.allSubscription) {
        this.$notification.error({
          message: 'Error',
          description: 'Please subscribe to continue',
          duration: 4000,
        })
        this.$router.push('/admin/self-service/subscribe')
        return
      }
      this.$router.replace(path)
    },
    titleClickHandler(key) {
      this.openKeys[0] = key
      this.subMenuTrue = !this.subMenuTrue
    },
    checkPathHandler(path, key) {
      if (this.$route.path === path) {
        if (key) {
          console.log(key, 'KEY')
          this.key = key
          console.log(this.key, 'THIS KEY')
          this.openKeys[0] = key
        }
        return true
      }
      return false
    },
    checkPathChildHandler(path) {
      if (this.$route.path === path) {
        return true
      }
      return false
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/elements/test.scss';
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
}
.menu_anchor {
  color: $medium-purple;
}
.bottom-menu {
  position: absolute;
  bottom: -3rem;
}
</style>
