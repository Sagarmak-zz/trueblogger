<template>
  <div class="dashboard-content">
    <div v-if="isFullPageLoading" class="d-flex justify-center align-center mh-50">
      <v-progress-circular size="50" indeterminate color="primary" />
    </div>
    <div v-else>
      <v-row dense>
        <v-col v-for="post in posts" :key="post.ID" cols="12" :xs="12" :sm="6" :md="6" :lg="6">
          <DashboardBlogCard :post="post" variant="large" />
        </v-col>
      </v-row>
      <div class="load-more mt-2">
        <v-btn :loading="loadingMore" color="primary" @click="loadMorePosts">Load More..</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardBlogCard from "@/components/DashboardBlogCard.vue";

export default {
  name: "DashboardContent",
  components: {
    DashboardBlogCard
  },
  data() {
    return {
      loadingMore: false
    };
  },
  methods: {
    getPosts(number = 20, offset = 0, page = 1) {
      this.$store
        .dispatch("getPosts", {
          number,
          offset,
          page
        })
        .finally(() => {
          this.loadingMore = false;
        });
    },
    loadMorePosts() {
      this.loadingMore = true
      // No of posts, Offset, page Number
      this.getPosts(4, this.posts.length, null);
    }
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
    isFullPageLoading() {
      return !this.posts.length;
    }
  }
};
</script>
