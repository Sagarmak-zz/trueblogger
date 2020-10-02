<template>
  <v-col cols="12">
    <v-card class="dashboard-content__main__card-large" flat v-ripple>
      <v-row>
        <v-col class="py-0 py-lg-2" cols="12" :xs="12" :sm="7" :md="7" :lg="7" :xl="7">
          <v-img
            :src="post.featured_image"
            max-height="400"
            aspect-ratio="2"
            class="rounded pointer"
            @click="redirectToBlog(post.ID)"
          >
            <template v-slot:placeholder>
              <v-sheet color="grey lighten-4" class="px-3 pt-3 pb-3">
                <v-skeleton-loader class="mx-auto" height="400" type="image"></v-skeleton-loader>
              </v-sheet>
            </template>
          </v-img>
        </v-col>
        <v-col
          cols="12"
          :xs="12"
          :sm="5"
          :md="5"
          :lg="5"
          :xl="5"
          class="py-0 dashboard-content__main__card-large__body"
        >
          <div
            class="dashboard-content__main__card-large__body-header px-4 py-md-4 pointer"
            @click="redirectToBlog(post.ID)"
          >
            <div
              class="text-h5 text-sm-h5 text-md-h4 text-xl-h3 pt-4 pt-sm-0 pb-2 pb-sm-1 pb-md-2 py-xl-4 font-weight-medium"
              v-html="post.title"
            ></div>
            <div class="text-caption text-sm-caption text-md-subtitle-1">
              <span>{{ formatDate(post.date) }}</span>
              <span v-if="Object.values(post.tags).length" class="px-2">|</span>
              <v-chip
                color="primary"
                small
                label
                outlined
                v-for="tag in Object.values(post.tags).slice(0, 2)"
                :key="tag.ID"
                class="mr-2 text-capitalize"
              >{{ tag.name }}</v-chip>
            </div>
          </div>
          <div
            class="text-body-2 text-sm-body-2 text-md-subtitle-2 text-lg-subtitle-1 text-xl-h6 pa-4 py-sm-1 py-md-3 py-lg-4 py-xl-6 pointer"
            v-html="post.excerpt"
            @click="redirectToBlog(post.ID)"
          ></div>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>
<script>
import Utils from "@/utils/Utils.js";

export default {
  name: "DashboardFeatureCard",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    /**
     * Redirects to Blog
     *
     * @param { number } postID
     * @return { void }
     */
    redirectToBlog(postID) {
      this.$router.push({ name: "Blog", params: { blogId: postID } });
    },

    /**
     * Return the distance between the given date and now in words.
     *
     * @param { string } date
     * @return { Date }
     */
    formatDate(date) {
      return Utils.formatDistance(date);
    }
  }
};
</script>
