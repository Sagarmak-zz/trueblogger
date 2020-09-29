<template>
  <div class="dashboard-blog-card">
    <v-card outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-2">{{ formatDate(post.date) }}</div>
          <v-list-item-title class="headline mb-1">{{ post.title }}</v-list-item-title>
          <v-list-item-subtitle v-html="post.excerpt"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey">
          <v-img :src="post.featured_image"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn
          outlined
          rounded
          text
          @click="$router.push({ name: 'Blog', params: { blogId: post.ID } })"
        >Button</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import Utils from "@/utils/Utils.js";

export default {
  name: "DashboardBlogCard",
  props: {
    post: {
      type: Object,
      required: true
    },
    variant: {
      type: String,
      required: false,
      default: "small" // other variants: large, medium
    }
  },
  methods: {
    formatDate(date) {
      return Utils.formatDistance(date);
    }
  }
};
</script>
