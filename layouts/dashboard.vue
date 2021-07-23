<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      v-model="collapsed"
      :trigger="null"
      collapsible
      :width="230"
      style="overflow-y: scroll"
    >
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
            <a-icon type="user" />
            <span
              ><a class="menu_anchor" @click="goToPage(menu.path)">{{
                menu.name
              }}</a></span
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
              ><a-icon type="user" /><span style="margin-left: 5px">{{
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
          'overflow-y': 'scroll',
        }"
      >
        <Nuxt />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import AppHeader from '@/components/AppHeader'
import { clientMenu, doctorMenu } from '@/menu.json'

export default {
  components: {
    AppHeader,
  },
  data() {
    return {
      collapsed: false,
      userObject: {},
      menuList: [],
      key: '',
      openKeys: [],
      subMenuTrue: false,
      doctorMenu,
      clientMenu,
    }
  },
  // computed: {
  //   openKeys: {
  //     get() {
  //       return this.key ? [this.key] : []
  //     },
  //     set(val) {},
  //   },
  // },
  mounted() {
    this.userObject = JSON.parse(localStorage.getItem('user'))
    const role = this.userObject.roles[0].name

    if (role === 'doctor') {
      this.menuList = [...doctorMenu]
      return
    }
    this.menuList = [...doctorMenu]
  },
  methods: {
    goToPage(path) {
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
