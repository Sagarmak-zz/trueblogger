import axios from "axios";
import config from "@/config.js";

let axiosInstance = axios.create({
  baseURL: config.baseUrl()
});

/**
 *  Axios interception goes here
 */

export default axiosInstance;
