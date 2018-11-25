import Vue from "vue";
import Router from "vue-router";
// import MyRecommend from 'src/views/MyRecommend/MyRecommend'
// import MySinger from 'src/views/MySinger/MySinger'
// import MyRank from 'src/views/MyRank/MyRank'
// import MySearch from 'src/views/MySearch/MySearch'
// import MySingerDetail from 'src/views/MySingerDetail/MySingerDetail'
// import MySongListDetail from 'src/views/MySongListDetail/MySongListDetail'
// import MyRankDetail from 'src/views/MyRankDetail/MyRankDetail'
// import MyUser from 'src/views/MyUser/MyUser'

Vue.use(Router);

// 路由懒加载
const MyRecommend = () => import("src/views/MyRecommend/MyRecommend");
const MySinger = () => import("src/views/MySinger/MySinger");
const MyRank = () => import("src/views/MyRank/MyRank");
const MySearch = () => import("src/views/MySearch/MySearch");
const MySingerDetail = () => import("src/views/MySingerDetail/MySingerDetail");
const MySongListDetail = () =>
  import("src/views/MySongListDetail/MySongListDetail");
const MyRankDetail = () => import("src/views/MyRankDetail/MyRankDetail");
const MyUser = () => import("src/views/MyUser/MyUser");

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/recommend"
    },
    {
      path: "/user",
      name: "user",
      component: MyUser
    },
    {
      path: "/recommend",
      name: "recommend",
      component: MyRecommend,
      children: [
        {
          path: ":id",
          name: "songlistdetail",
          component: MySongListDetail
        }
      ]
    },
    {
      path: "/singer",
      name: "singer",
      component: MySinger,
      children: [
        {
          path: ":id",
          name: "singerdetail",
          component: MySingerDetail
        }
      ]
    },
    {
      path: "/rank",
      name: "rank",
      component: MyRank,
      children: [
        {
          path: ":id",
          name: "rankdetail",
          component: MyRankDetail
        }
      ]
    },
    {
      path: "/search",
      name: "search",
      component: MySearch,
      children: [
        {
          path: ":id",
          component: MySingerDetail
        }
      ]
    }
  ]
});
