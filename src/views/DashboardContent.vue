<template>
  <div class="dashboard-content">
    <div v-for="(post, i) in posts" :key="post.ID">
      <pre>
        {{ i+1 }} - {{ post.title }} - {{ post.featured_image }} - {{ post.excerpt }} - {{ post.date }}
      </pre>
    </div>
  </div>
</template>
<script>
export default {
  name: "DashboardContent",
  data() {
    return {
      noOfPostsInAPage: 25,
      pageNo: 1
    };
  },
  created() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      this.$store.dispatch("getPosts", {
        noOfPostsInAPage: this.noOfPostsInAPage,
        pageNo: this.pageNo
      });
    }
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    }
  }
};
</script>
