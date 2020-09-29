import Vue from "vue";
import Vuex from "vuex";
import api from "@/packages/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: []
  },
  actions: {
    getPosts(context, data) {
      return api.posts(data).then(response => {
        context.commit('storePosts', response);
      });
    }
  },
  mutations: {
    storePosts(state, payload) {
      state.posts = [...state.posts, ...payload.posts];
    }
  },
  getters: {
    posts (state) {
      return state.posts;
    }
  }
});
