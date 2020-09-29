import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import DashboardContent from "../views/DashboardContent.vue";
import Blog from "../views/Blog.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Dashboard,
    children: [
      {
        path: "/",
        name: "DashboardContent",
        component: DashboardContent
      },
      {
        path: "/:blogId",
        name: "Blog",
        component: Blog,
        props: true
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
