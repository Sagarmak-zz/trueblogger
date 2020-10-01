<template>
  <v-app-bar short elevate-on-scroll absolute app color="white" class="dashboard-navbar">
    <v-container class="py-0 fill-height">
      <div class="app-logo">
        <v-img max-width="9rem" :src="getLogoPath" />
      </div>
      <v-spacer />
      <v-menu left bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon color="primary">fas fa-ellipsis-v</v-icon>
          </v-btn>
        </template>

        <v-card max-height="700" class="pa-4">
          <v-card flat class="pa-4">
            <div class="text-h6 rounded">Categories</div>
            <v-row v-if="categories && categories.length">
              <div v-for="category in categories" :key="category.ID" class="category-name">
                <v-chip
                  label
                  class="ma-2 white--text"
                  :color="category.color"
                  @click="getCategoryPosts(category)"
                >{{ category.name }}</v-chip>
              </div>
            </v-row>
            <v-row v-else class="pa-4">No categories found</v-row>
          </v-card>
          <v-divider />
          <v-card flat class="pa-4">
            <div class="text-h6 mt-2">Tags</div>
            <v-row v-if="tags && tags.length">
              <div cols="3" v-for="tag in tags" :key="tag.ID">
                <v-chip
                  color="primary"
                  class="ma-1 mt-2"
                  @click="getTagPosts(tag)"
                >#{{ tag.name }}</v-chip>
              </div>
            </v-row>
            <v-row v-else class="pa-4">No tags found</v-row>
          </v-card>
        </v-card>
      </v-menu>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "DashboardNavbar",
  props: {
    appName: {
      default: "",
      type: String
    }
  },
  methods: {
    getCategoryPosts(category) {
      this.getCategoryOrTagPosts(category, null);
    },
    getTagPosts(tag) {
      this.getCategoryOrTagPosts(null, tag);
    },
    getCategoryOrTagPosts(category = null, tag = null) {
      if(this.$route && this.$route.name == "Blog") {
        this.$router.push({ name: "DashboardContent" });
      }
      this.$store.dispatch("getPosts", {
        number: 25,
        offset: null,
        page: null,
        category: (category && category.slug) || null,
        tag: (tag && tag.slug) || null,
        newArr: true
      });
    }
  },
  computed: {
    getLogoPath() {
      return "/img/trueblogger.png";
    },
    categories() {
      return this.$store.getters.categories;
    },
    tags() {
      return this.$store.getters.tags;
    }
  }
};
</script>

<style lang="scss">
.dashboard-navbar {
  .app-logo {
    display: inherit;
    img {
      width: inherit;
    }
  }
}
</style>
