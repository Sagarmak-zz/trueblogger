<template>
  <v-app-bar short app color="primary" elevate-on-scroll class="dashboard-navbar px-7">
    <div class="app-logo">
      <v-img :src="getLogoPath" />
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "DashboardNavbar",
  props: {
    appName: {
      default: "",
      type: String
    }
  },
  computed: {
    getLogoPath() {
      return "/img/trueblogger-white.png";
    }
  }
};
</script>

<style lang="scss">
.app-logo {
  display: inherit;
  img {
    width: inherit;
  }
}
</style>
