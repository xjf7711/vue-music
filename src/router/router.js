import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: Home
    // },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // },
    {
      path: "/",
      redirect: "/recommend"
    },
    {
      path: "/recommend",
      component: () => import("./views/recommend/recommend"),
      children: [
        {
          path: ":id",
          component: () => import("./views/disc/disc")
        }
      ]
    },
    {
      path: "/singer",
      component: () => import("./views/singer/singer"),
      children: [
        {
          path: ":id",
          component: () => import("./views/singer-detail/singer-detail")
        }
      ]
    },
    {
      path: "/rank",
      component: () => import("./views/rank/rank"),
      children: [
        {
          path: ":id",
          component: () => import("./views/top-list/top-list")
        }
      ]
    },
    {
      path: "/search",
      component: () => import("./views/search/search"),
      children: [
        {
          path: ":id",
          component: () => import("./views/singer-detail/singer-detail")
        }
      ]
    },
    {
      path: "/user",
      component: () => import("./views/user-center/user-center")
    }
  ]
});
