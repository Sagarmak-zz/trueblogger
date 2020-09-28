<template>
  <div class="dashboard-navbar">
    <v-app-bar app color="primary" elevate-on-scroll>
      <div class="d-flex align-center white--text">{{ appName }}</div>
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
  }
};
</script>

<style lang="scss" scoped>
</style>
