<template>
  <v-col cols="12" :xs="12" :sm="6" :md="6" class="mt-4 pr-4 py-4">
    <v-card flat :to="{ name: 'Blog', params: { blogId: post.ID }}">
      <v-row>
        <v-col class="py-0 py-lg-2" cols="12">
          <v-img :src="post.featured_image" max-height="250" aspect-ratio="2" class="rounded">
            <template v-slot:placeholder>
              <v-sheet color="grey lighten-4" class="px-3 pt-3 pb-3 fill-height">
                <v-skeleton-loader class="mx-auto" height="400" type="image"></v-skeleton-loader>
              </v-sheet>
            </template>
          </v-img>
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="px-4">
            <div class="text-h5 pt-4 pb-2 font-weight-medium" v-html="post.title"></div>
            <div class="text-caption d-flex align-center">
              <span>{{ formatDate(post.date) }}</span>
              <span v-if="Object.values(post.tags).length" class="px-2">|</span>
              <v-chip
                color="primary"
                small
                label
                outlined
                v-for="tag in Object.values(post.tags).slice(0, 4)"
                :key="tag.ID"
                class="mr-2 text-capitalize"
              >{{ tag.name }}</v-chip>
            </div>
          </div>
          <div
            class="text-body-2 text-sm-subtitle-2 text-md-subtitle-2 text-lg-subtitle-1 text-xl-h6 pa-4 py-sm-1 py-md-3 py-lg-4 py-xl-6"
            v-html="post.excerpt"
          ></div>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>
<script>
import Utils from "@/utils/Utils.js";

export default {
  name: "DashboardMediumCard",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      return Utils.formatDistance(date);
    }
  }
};
</script>
