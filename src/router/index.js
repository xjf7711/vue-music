import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

// 路由懒加载
const Recommend = () => import("src/views/recommend/Recommend");
const Singer = () => import("src/views/singer/Singer");
const Rank = () => import("src/views/rank/Rank");
const Search = () => import("src/views/search/Search");
const SingerDetail = () => import("src/views/singer-detail/SingerDetail");
const SongList = () => import("src/views/song-list/SongList");
const RankDetail = () => import("src/views/rank-detail/RankDetail");
const User = () => import("src/views/user/User");

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
