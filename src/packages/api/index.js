import HTTP from "@/packages/http";
import * as EP from "./endpoints.js";

export default {
  posts(data) {
    return HTTP.get(EP.POSTS, {
      params: {
        number: data.number,
        offset: data.offset || 0,
        page: data.page
      }
    }).then(({ data }) => data);
  }
};
