import Vue from "vue";
import VueRouter from "vue-router";
const Dashboard = () => import(/* webpackChunkName: 'dashboard' */ "../views/Dashboard.vue");
const DashboardContent = () => import(/* webpackChunkName: 'dashboard' */ "../views/DashboardContent.vue");
const Blog = () => import(/* webpackChunkName: 'blog' */ "../views/Blog.vue");

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
