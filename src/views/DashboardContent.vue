<template>
  <div class="dashboard-content">
    <div v-if="isFullPageLoading" class="d-flex justify-center align-center mh-50">
      <v-progress-circular size="50" indeterminate color="primary" />
    </div>
    <div class="dashboard-content__main" v-else-if="posts && posts.length">
      <v-row dense>
        <DashboardFeatureCard v-for="(post) in posts.slice(0, 1)" :post="post" :key="post.ID" />
        <DashboardMediumCard v-for="(post) in posts.slice(1)" :post="post" :key="post.ID" />
      </v-row>
      <div class="load-more mt-2">
        <v-btn :loading="loadingMore" color="primary" @click="loadMorePosts">Load More..</v-btn>
      </div>
    </div>
    <div v-else>No posts found</div>
  </div>
</template>
<script>
import DashboardFeatureCard from "@/components/DashboardFeatureCard.vue";
import DashboardMediumCard from "@/components/DashboardMediumCard.vue";

export default {
  name: "DashboardContent",
  components: {
    DashboardFeatureCard,
    DashboardMediumCard
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
      this.loadingMore = true;
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
