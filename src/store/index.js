import Vue from "vue";
import Vuex from "vuex";
import api from "@/packages/api";
import Utils from "@/utils/Utils.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    totalPosts: null,
    categories: [],
    category: "",
    tags: [],
    tag: ""
  },
  actions: {
    /**
     * Get Posts
     * based on post numbers, offset, page number, category, tag
     *
     * @param { object: { context, dispatch, getters, state, ... } } context
     * @param { object: { number, offset, page, category, tag, newArr } } data
     * @return { Promise } data
     */
    getPosts (context, data) {
      // store selected category, or a tag
      context.commit('storeCategoryOrTag', data);

      /**
       * if newArr, then empty the posts array
       * e.g. if category/tag selected,
       * empty the array to make way new posts
       */
      data.newArr && context.commit('emptyPosts');

      return api.posts(data).then(response => context.commit('storePosts', response));
    },

    /**
     * Get Post by id
     *
     * @param { object: { context, dispatch, getters, state, ... } } context
     * @param { object: { id } } data
     * @return { Promise } data
     */
    getPostById (context, data) {
      return api.postById(data).then(response => response);
    },

    /**
     * Get related blog posts' data by post id
     *
     * @param { object: { context, dispatch, getters, state, ... } } context
     * @param { object: { id } } data
     * @return { Promise } data
     */
    getRelatedBlogPostsById (context, data) {
      return api.relatedBlogPostById(data).then(response => response);
    },

    /**
     * Get Categories
     *
     * @param { object: { context, dispatch, getters, state, ... } } context
     * @param {}
     * @return { Promise } data
     */
    getCategories (context) {
      return api.categories().then(response => context.commit('storeCategories', response));
    },

    /**
     * Get Tags
     *
     * @param { object: { context, dispatch, getters, state, ... } } context
     * @param {}
     * @return { Promise } data
     */
    getTags (context) {
      return api.tags().then(response => context.commit('storeTags', response));
    }
  },
  mutations: {
    /**
     * Store Posts
     *
     * @param { object } state
     * @param { object: { posts, found, meta } } payload
     * @return { void }
     */
    storePosts (state, payload) {
      state.totalPosts = payload && payload.found;
      state.posts = [...state.posts, ...payload.posts];
    },

    /**
     * Store Categories
     * and add a color prop to each category
     *
     * @param { object } state
     * @param { object: { found, categories } } payload
     * @return { void }
     */
    storeCategories (state, payload) {
      const colors = Utils.randomColors(payload.categories.length);
      state.categories = payload.categories.map((item, index) => {
        return { ...item, color: colors[index] };
      });
    },

    /**
     * Store Tags
     * sort, descending
     * and get top 10 tags
     *
     * @param { object } state
     * @param { object: { found, tags } } payload
     * @return { void }
     */
    storeTags (state, payload) {
      state.tags = payload.tags.sort((a, b) => b.post_count - a.post_count).splice(0, 10);
    },

    /**
     * Store Category,
     * if not
     * Store Tag
     *
     * @param { object } state
     * @param { object: { category, tag } } payload
     * @return { void }
     */
    storeCategoryOrTag (state, payload) {
      const category = payload && payload.category;
      const tag = payload && payload.tag;

      if (!category && !tag) {
        state.category = "";
        state.tag = "";
      } else if (category && !tag) {
        state.category = category;
        state.tag = "";
      } else {
        state.category = "";
        state.tag = tag;
      }
    },

    /**
     * Empty Posts Array
     *
     * @param { object } state
     * @return { void }
     */
    emptyPosts (state) {
      state.posts = [];
    }
  },
  getters: {
    posts (state) {
      return state.posts;
    },
    totalPosts (state) {
      return state.totalPosts;
    },
    categories (state) {
      return state.categories;
    },
    tags (state) {
      return state.tags;
    },
    category (state) {
      return state.category;
    },
    tag (state) {
      return state.tag;
    }
  }
});
