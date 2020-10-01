<template>
  <div class="blog-post">
    <div v-if="loading" class="d-flex justify-center align-center mh-50">
      <v-progress-circular size="50" indeterminate color="primary" />
    </div>
    <div class="wrapper" v-else-if="post && postTitle">
      <div class="head">
        <div class="title text-h5 text-sm-h4 text-md-h3" v-html="postTitle"></div>
        <div class="text-body-2 mt-4">
          By
          <span class="author-name">{{ authorName }}</span> |
          <span class="time">{{ postDate }}</span>
        </div>
      </div>
      <div class="thumbnail my-5" v-if="thumbnailURL">
        <v-img
          :src="thumbnailURL"
          lazy-src="https://place-hold.it/700x387"
          height="387"
          width="700"
        />
      </div>
      <div class="content my-4 text-subtitle-1" v-html="postContent"></div>
    </div>
    <div class="text-center" v-else>
      <div class="text-h5 font-italic">Something went wrong</div>
      <div
        class="text-body-2 font-weight-bold mt-2"
        v-if="error && error.message"
      >Error Message: {{ error.message }}</div>
    </div>
  </div>
</template>
<script>
import Utils from "@/utils/Utils.js";

export default {
  name: "Blog",
  props: ["blogId"],
  data() {
    return {
      post: {},
      postTitle: "",
      postDate: "",
      postContent: "",
      authorName: "",
      thumbnailURL: "",
      loading: false,
      error: {}
    };
  },
  created() {
    this.loading = true;
    this.getPostById();
    // this.getRelatedBlogPostsById();
  },
  methods: {
    getPostById() {
      this.$store
        .dispatch("getPostById", { id: this.blogId })
        .then(res => {
          this.post = res;
          this.postTitle = (res && res.title) || "";
          this.postDate =
            (res && res.date && this.formatISODate(res.date)) || "";
          this.postContent = (res && res.content) || "";
          this.authorName = (res && res.author && res.author.name) || "";
          this.thumbnailURL =
            (res && res.post_thumbnail && res.post_thumbnail.URL) || "";
        })
        .catch(err => {
          this.error.status = err.response.status;
          this.error.message = err.response.data.message;
        })
        .finally(() => (this.loading = false));
    },
    getRelatedBlogPostsById() {
      this.$store
        .dispatch("getRelatedBlogPostsById", { id: this.blogId })
        .then(res => {
          console.log(res);
        });
    },
    formatISODate(date) {
      return Utils.formatISODate(date, "PPpp");
    }
  }
};
</script>
<style lang="scss">
.blog-post {
  .wrapper {
    max-width: 44rem;
    margin: 0 auto;
  }

  p {
    font-size: inherit;
    margin-bottom: 2rem;
  }
}
</style>
