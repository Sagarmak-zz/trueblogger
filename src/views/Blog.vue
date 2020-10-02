<template>
  <div class="blog-post">
    <div v-if="loading" class="d-flex justify-center align-center mh-50">
      <v-progress-circular size="50" indeterminate color="primary" />
    </div>
    <div class="blog-post__parent" v-else-if="post && postTitle">
      <div class="blog-post__parent__wrapper">
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
            max-height="387"
            max-width="700"
          />
        </div>
        <div class="content my-4 text-subtitle-1" v-html="postContent"></div>
      </div>
      <div class="blog-post__parent__recommendations px-4 mt-8">
        <div
          class="blog-post__parent__recommendations__title text-h5 font-italic pt-4 pb-2"
        >Related blog posts</div>
        <v-row v-if="!loadingRecommendations && top3RecommendedPosts.length">
          <v-col v-for="post in top3RecommendedPosts" :key="post.ID">
            <v-card
              flat
              class="mx-auto"
              max-width="344"
              @click="redirectToRecommendedBlog(post.ID)"
            >
              <v-img :src="post.post_thumbnail && post.post_thumbnail.URL" height="200px" />
              <div class="text-h6 font-weight-medium pa-4" v-html="post.title"></div>
              <v-card-subtitle class="pt-0" v-html="post.excerpt"></v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
        <div
          v-else-if="loadingRecommendations && !top3RecommendedPosts.length"
          class="d-flex justify-center align-center mh-50"
        >
          <v-progress-circular size="50" indeterminate color="primary" />
        </div>
      </div>
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

      error: {},
      top3RecommendedPostsRawData: [],
      top3RecommendedPosts: [],
      loadingRecommendations: false
    };
  },
  created() {
    this.getPostById();
  },
  methods: {
    /**
     * Get a Promise of a post by ID
     *
     * @param { number } id
     * @return { Promise }
     */
    getPostPromiseById(id = this.blogId) {
      return this.$store.dispatch("getPostById", { id });
    },

    /**
     * Get a Post by ID
     *
     * @param { number } id
     * @return { void }
     */
    getPostById(id = this.blogId) {
      this.loading = true;
      this.top3RecommendedPosts = [];
      this.getPostPromiseById(id)
        .then(res => {
          this.getRelatedBlogPostsById();
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

    /**
     * Get Recommended Posts Id's
     *
     * @param { number } id
     * @return { void }
     */
    getRelatedBlogPostsById(id = this.blogId) {
      this.loadingRecommendations = true;
      this.$store.dispatch("getRelatedBlogPostsById", { id }).then(res => {
        this.top3RecommendedPostsRawData = res.hits && res.hits.slice(0, 3);
        this.getRecommendedPosts();
      });
    },

    /**
     * Get Recommended Array of Posts
     *
     * @param { number } id
     * @return { Array<Post> }
     */
    getRecommendedPosts() {
      let requests = [];
      this.top3RecommendedPostsRawData.forEach(item => {
        let postID = item && item.fields && item.fields.post_id;
        requests.push(this.getPostPromiseById(postID));
      });
      Promise.all(requests).then(res => {
        this.top3RecommendedPosts = res;
        this.loadingRecommendations = false;
      });
    },

    /**
     * Changes the URL param and gets the recommended post details
     *
     * @param { number } id
     * @param { string } format
     * @return { void }
     */
    redirectToRecommendedBlog(postID) {
      this.$router.push({ name: "Blog", params: { blogId: postID } });
      this.getPostById(postID);
    },

    /**
     * Format an ISO format string date
     * - converts a string date ('2014-02-11T11:30:30') to Date ('Tue Feb 11 2014 11:30:30')
     * - formats to "PPpp" format ('May 29, 1453, 12:00:00 AM')
     *
     * @param { String } date
     * @param { String } format
     * @return { Date }
     */
    formatISODate(date) {
      return Utils.formatISODate(date, "PPpp");
    }
  }
};
</script>
<style lang="scss">
.blog-post {
  &__parent {
    &__wrapper {
      max-width: 44rem;
      margin: 0 auto;
    }

    p {
      font-size: inherit;
      margin-bottom: 2rem;
    }

    &__recommendations {
      &__title {
        border-top: solid 1px #c5c5c5;
      }
    }
  }
}
</style>
