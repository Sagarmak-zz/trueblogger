<template>
  <div class="dashboard-content">
    <v-row dense>
      <v-col v-for="post in posts" :key="post.ID" cols="12" :xs="12" :sm="6" :md="6" :lg="6">
        <DashboardBlogCard :post="post" variant="large" />
      </v-col>
    </v-row>
    <div class="load-more mt-2">
      <v-btn color="primary" @click="loadMorePosts">Load More..</v-btn>
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
    },
    loadMorePosts() {
      // No of posts, Offset, page Number
      this.getPosts(4, this.posts.length, null);
    }
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    }
  }
};
</script>
