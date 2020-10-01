import HTTP from "@/packages/http";
import * as EP from "./endpoints.js";

export default {
  posts(data) {
    return HTTP.get(EP.POSTS, {
      params: {
        number: data.number || null,
        offset: data.offset || null,
        page: data.page || null,
        category: data.category || null,
        tag: data.tag || null
      }
    }).then(({ data }) => data);
  },
  postById(data) {
    return HTTP.get(`${EP.POSTS}/${data.id}`).then(({ data }) => data);
  },
  relatedBlogPostById(data) {
    let url = `${EP.POSTS}/${data.id}/related`;
    return HTTP.post(url).then(({ data }) => data);
  },

  categories () {
    return HTTP.get(EP.CATEGORIES).then(({ data }) => data);
  },
  tags(){
    return HTTP.get(EP.TAGS).then(({ data }) => data);
  }
};
