<template>
  <div class="blog-post">
    <div v-if="loading" class="d-flex justify-center align-center mh-50">
      <v-progress-circular size="50" indeterminate color="primary" />
    </div>
    <div class="wrapper" v-else>
      <div class="head">
        <div class="title text-h3" v-html="post.title"></div>
        <div class="text-body-2 mt-4">
          By <span class="author-name">{{ post.author.name }}</span> |
          <span class="time">{{ formatISODate(post.date) }}</span>
        </div>
      </div>
      <div class="thumbnail my-5">
        <v-img :src="post.post_thumbnail.URL" lazy-src="https://place-hold.it/700x387" height="387" width="700" />
      </div>
      <div class="content my-4 text-subtitle-1" v-html="post.content"></div>
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
      loading: false
    };
  },
  created() {
    this.loading = true;
    this.getPostById(this.noOfPostsInAPage, null, this.pageNo);
  },
  methods: {
    getPostById() {
      this.$store.dispatch("getPostById", { id: this.blogId })
      .then((res) => {
        this.post = res;
      })
      .finally(() => this.loading = false);
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
}
</style>
