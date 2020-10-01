<template>
  <div class="dashboard fill-height">
    <DashboardNavbar :app-name="appName" />

    <v-main class="mb-5">
      <v-container class="mt-6">
        <router-view />
      </v-container>
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
    this.getCategories();
    this.getTags();
  },
  methods: {
    getPosts(number = 20, offset = 0, page = 1) {
      this.$store.dispatch("getPosts", {
        number,
        offset,
        page
      });
    },
    getCategories() {
      this.$store.dispatch("getCategories");
    },
    getTags() {
      this.$store.dispatch("getTags");
    }
  },
  computed: {
    appName() {
      return config.appTitle();
    }
  }
};
</script>
