<template>
  <div class="home">
    <DashboardNavbar :app-name="appName" />

    <v-main class="mb-5" :class="breakpointMargin">
      <router-view />
    </v-main>
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
  data() {
    return {
      noOfPostsInAPage: 25,
      pageNo: 1
    };
  },
  created() {
    this.getPosts(this.noOfPostsInAPage, null, this.pageNo);
  },
  methods: {
    getPosts(number = 20, offset = 0, page = 1) {
      this.$store.dispatch("getPosts", {
        number,
        offset,
        page
      });
    }
  },
  computed: {
    appName() {
      return config.appTitle();
    },
    breakpoint() {
      return this.$vuetify.breakpoint.name;
    },
    breakpointMargin() {
      switch (this.breakpoint) {
        case "xs":
          return "mt-4 mx-2";
        case "sm":
          return "mt-7 mx-7";
        case "md":
          return "mt-9 mx-9";
        case "lg":
        case "xl":
          return "mt-11 mx-11";

        default:
          return "w-75";
      }
    }
  }
};
</script>
