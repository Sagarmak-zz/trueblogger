import HTTP from "@/packages/http";
import * as EP from "./endpoints.js";

export default {
  posts(data) {
    return HTTP.get(EP.POSTS, {
      params: {
        number: data.noOfPostsInAPage,
        page: data.pageNo
      }
    }).then(({ data }) => data);
  }
};
