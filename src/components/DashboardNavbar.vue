<template>
  <div class="dashboard-navbar">
    <v-app-bar app color="primary" elevate-on-scroll>
      <div class="app-logo">
        <img :src="getLogoPath" />
      </div>
    </v-app-bar>
  </div>
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
