<template>
  <v-app-bar short elevate-on-scroll absolute app color="white" class="dashboard-navbar">
    <v-container class="py-0 fill-height">
      <div class="app-logo pointer" @click="$router.push({ name: 'DashboardContent' })">
        <v-img max-width="9rem" :src="getLogoPath" />
      </div>
      <v-spacer />
      <v-menu left bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon color="primary">fas fa-bars</v-icon>
          </v-btn>
        </template>

        <v-card class="pa-4">
          <v-card flat class="pa-4">
            <div class="text-h5 font-weight-medium rounded pa-xs-0 pa-sm-4">Categories</div>
            <v-row v-if="categories && categories.length" class="px-xs-0 px-sm-4">
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
            <div class="text-h5 font-weight-medium mt-2 pa-xs-0 pa-sm-4">Tags</div>
            <v-row v-if="tags && tags.length" class="pt-xs-2 px-xs-0 px-sm-4">
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
  methods: {
    /**
     * Get Posts of a Category
     *
     * @param { object } category
     * @return { void }
     */
    getCategoryPosts(category) {
      this.getCategoryOrTagPosts(category, null);
    },

    /**
     * Get Posts of a Tag
     *
     * @param { object } tag
     * @return { void }
     */
    getTagPosts(tag) {
      this.getCategoryOrTagPosts(null, tag);
    },

    /**
     * Get Category or Tag Posts
     *
     * @param { object } category
     * @param { object } tag
     * @return { void }
     */
    getCategoryOrTagPosts(category = null, tag = null) {
      if(this.$route && this.$route.name == "Blog") {
        this.$router.push({ name: "DashboardContent" });
      }
      this.$store.dispatch("getPosts", {
        number: 25,
        offset: null,
        page: 1,
        category: (category && category.slug) || null,
        tag: (tag && tag.slug) || null,
        newArr: true
      });
    }
  },
  computed: {
    /* Return Logo Path */
    getLogoPath() {
      return "/img/trueblogger.png";
    },

    /* Return Categories */
    categories() {
      return this.$store.getters.categories;
    },

    /* Return Tags */
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
