import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

// 路由懒加载
const Recommend = () => import("src/views/Recommend/Recommend");
const Singer = () => import("src/views/Singer/Singer");
const Rank = () => import("src/views/Rank/Rank");
const Search = () => import("src/views/Search/Search");
const SingerDetail = () => import("src/views/SingerDetail/SingerDetail");
const SongList = () => import("src/views/SongList/SongList");
const RankDetail = () => import("src/views/RankDetail/RankDetail");
const User = () => import("src/views/User/User");

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/recommend"
    },
    {
      path: "/user",
      name: "user",
      component: User
    },
    {
      path: "/recommend",
      name: "recommend",
      component: Recommend,
      children: [
        {
          path: ":id",
          name: "SongList",
          component: SongList
        }
      ]
    },
    {
      path: "/singer",
      name: "singer",
      component: Singer,
      children: [
        {
          path: ":id",
          name: "singerdetail",
          component: SingerDetail
        }
      ]
    },
    {
      path: "/rank",
      name: "rank",
      component: Rank,
      children: [
        {
          path: ":id",
          name: "rankdetail",
          component: RankDetail
        }
      ]
    },
    {
      path: "/search",
      name: "search",
      component: Search,
      children: [
        {
          path: ":id",
          component: SingerDetail
        }
      ]
    }
  ]
});
