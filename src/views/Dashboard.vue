<template>
  <div class="dashboard fill-height">
    <DashboardNavbar />

    <v-main class="mb-5">
      <v-container class="mt-6">
        <router-view />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import DashboardNavbar from "@/components/DashboardNavbar.vue";

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
    /**
     * Get Top N Posts
     *
     * @param { number } number
     * @param { number } offset
     * @param { number } page
     * @return { void }
     */
    getPosts(number = 20, offset = 0, page = 1) {
      this.$store.dispatch("getPosts", {
        number,
        offset,
        page
      });
    },

    /**
     * Get Array of Categories
     *
     * @param {}
     * @return { void }
     */
    getCategories() {
      this.$store.dispatch("getCategories");
    },

    /**
     * Get Array of Tags
     *
     * @param {}
     * @return { void }
     */
    getTags() {
      this.$store.dispatch("getTags");
    }
  }
};
</script>
