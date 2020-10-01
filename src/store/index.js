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
    getPosts (context, data) {
      context.commit('storeCategoryOrTag', data);

      data.newArr && context.commit('emptyPosts');

      return api.posts(data).then(response => context.commit('storePosts', response));
    },
    getPostById (context, data) {
      return api.postById(data).then(response => response);
    },
    getRelatedBlogPostsById (context, data) {
      return api.relatedBlogPostById(data).then(response => response);
    },

    getCategories (context, data) {
      return api.categories(data).then(response => context.commit('storeCategories', response));
    },
    getTags (context, data) {
      return api.tags(data).then(response => context.commit('storeTags', response));
    }
  },
  mutations: {
    storePosts (state, payload) {
      state.totalPosts = payload && payload.found;
      state.posts = [...state.posts, ...payload.posts];
    },
    storeCategories (state, payload) {
      const colors = Utils.randomColors(payload.categories.length);
      state.categories = payload.categories.map((item, index) => {
        return { ...item, color: colors[index] };
      });
    },
    storeTags (state, payload) {
      state.tags = payload.tags.sort((a, b) => b.post_count - a.post_count).splice(0, 10);
    },
    storeCategoryOrTag (state, payload) {
      const category = payload && payload.category;
      const tag = payload && payload.tag;

      if (!category && !tag) {
        state.category = "";
        state.tag = "";
      } else if(category && !tag) {
        state.category = category;
        state.tag = "";
      } else {
        state.category = "";
        state.tag = tag;
      }
    },
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
