import HTTP from "@/packages/http";
import * as EP from "./endpoints.js";

export default {
  /**
   * Get Posts
   *
   * @param { object: { number, offset, page, category, tag } } data
   * @return { object: { posts, found, meta } } data
   */
  posts (data) {
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

  /**
   * Get Post by ID
   *
   * @param { object: { id } } data
   * @return { object: { ID, title, excerpt, content, post_thumbnail, ... } } data
   */
  postById (data) {
    return HTTP.get(`${EP.POSTS}/${data.id}`).then(({ data }) => data);
  },

  /**
   * Get related blog posts' data by post id
   *
   * @param { object: { id } } data
   * @return { object: { total, max_score, hits } } data
   */
  relatedBlogPostById (data) {
    let url = `${EP.POSTS}/${data.id}/related`;
    return HTTP.post(url).then(({ data }) => data);
  },

  /**
   * Get Categories
   *
   * @param {}
   * @return { object: { found, categories } } data
   */
  categories () {
    return HTTP.get(EP.CATEGORIES).then(({ data }) => data);
  },

  /**
   * Get Tags
   *
   * @param {}
   * @return { object: { found, tags } } data
   */
  tags () {
    return HTTP.get(EP.TAGS).then(({ data }) => data);
  }
};
