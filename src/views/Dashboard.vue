<template>
  <div class="home">
    <DashboardNavbar :app-name="appName" />

    <v-main class="mb-5">Main content goes here</v-main>
  </div>
</template>

<script>
import DashboardNavbar from "@/components/DashboardNavbar.vue";
import config from "@/config.js";

export default {
  name: "Home",
  components: {
    DashboardNavbar
  },
  computed: {
    appName() {
      return config.appTitle();
    }
  }
};
</script>
