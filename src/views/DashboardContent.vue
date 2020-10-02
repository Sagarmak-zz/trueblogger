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
      <div v-if="showLoadMore" class="load-more mt-2">
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
    /**
     * Get Posts
     * either top N number of Posts
     * or using offset(Load More...)
     *
     * @param { number } postID
     * @param { number } offset
     * @param { number } page
     * @param { string } category
     * @param { string } tag
     * @param { boolean } newArr
     * @return { void }
     */
    getPosts(number = 20, offset = 0, page = 1, category = null, tag = null, newArr = false) {
      this.$store
        .dispatch("getPosts", {
          number,
          offset,
          page,
          category,
          tag,
          newArr
        })
        .finally(() => {
          this.loadingMore = false;
        });
    },

    /**
     * Get Posts based on offset
     *
     * @param {}
     * @return {}
     */
    loadMorePosts() {
      this.loadingMore = true;
      // No of posts, Offset, page Number
      this.getPosts(4, this.posts.length, null, this.category, this.tag, false);
    }
  },
  computed: {
    /* Return Posts Array */
    posts() {
      return this.$store.getters.posts;
    },
    /* Return total number of posts */
    totalPosts() {
      return this.$store.getters.totalPosts;
    },
    /* Return Load More button */
    showLoadMore() {
      return this.totalPosts > this.posts.length;
    },
    /* Returns true posts have data */
    isFullPageLoading() {
      return !this.posts.length;
    },
    /* Returns selected category */
    category() {
      return this.$store.getters.category;
    },
    /* Returns selected tag */
    tag() {
      return this.$store.getters.tag;
    }
  }
};
</script>
