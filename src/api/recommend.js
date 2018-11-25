// import jsonp from "../assets/js/jsonp";
// import request from "../assets/js/request";
// import { commonParams, options } from "./config";
// // import axios from "axios";
//
// export function getRecommend() {
//   const data = Object.assign({}, commonParams, {
//     platform: "h5",
//     uin: 0,
//     needNewCode: 1
//     // _: 1542893454334
//   });
//   const url =
//     "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
//   return jsonp(url, data, options);
//   // 以下代码无效。代理有问题？？？
//   // const params = Object.assign({}, commonParams, {
//   //   platform: "h5",
//   //   uin: 0,
//   //   needNewCode: 1,
//   //   jsonpCallback: "getPlaylist"
//   //   // _: 1542893454334
//   // });
//   // return request({
//   //   url: "/api/getRecommend/",
//   //   method: "get",
//   //   params
//   // });
// }
//
// export function getDiscList() {
//   // const params = {
//   //   picmid: 1,
//   //   rnd: Math.random(),
//   //   g_tk: 5381,
//   //   jsonpCallback: "getPlaylist",
//   //   loginUin: 0,
//   //   hostUin: 0,
//   //   format: "jsonp",
//   //   inCharset: "utf8",
//   //   outCharset: "utf-8",
//   //   notice: 0,
//   //   platform: "yqq",
//   //   needNewCode: 0,
//   //   categoryId: 10000000,
//   //   sortId: 5,
//   //   sin: 0,
//   //   ein: 29
//   // };
//   // const url =
//   //   process.env.NODE_ENV === "production"
//   //     ? "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg"
//   //     : "/api/getDiscList";
//   //
//   // // axios.get(url, {
//   // //   headers: {
//   // //     referer: 'https://c.y.qq.com/',
//   // //     host: 'c.y.qq.com'
//   // //   },
//   // //   params: req.query
//   // // }).then((response) => {
//   // //   res.json(response.data)
//   // // }).catch((e) => {
//   // //   console.log(e)
//   // // })
//   //
//   // // return axios
//   // //   .get(url, {
//   // //     params: data
//   // //   })
//   // //   .then(res => {
//   // //     return Promise.resolve(res.data);
//   // //   });
//   //
//   // return request({
//   //   // baseURL: "https://c.y.qq.com/",
//   //   url,
//   //   method: "get",
//   //   // headers: {
//   //   //   Referer: "https://c.y.qq.com/",
//   //   //   Host: "c.y.qq.com"
//   //   // },
//   //   params
//   // });
//   // const data = Object.assign({}, commonParams, {
//   //   picmid: 1,
//   //   rnd: Math.random(),
//   //   platform: "yqq",
//   //   hostUin: 0,
//   //   sin: 0,
//   //   ein: 29,
//   //   sortId: 5,
//   //   needNewCode: 0,
//   //   categoryId: 10000000,
//   //   format: "json"
//   // });
//   const data = Object.assign(
//     {},
//     {
//       g_tk: 5381,
//       notice: 0,
//       inCharset: "utf8",
//       outCharset: "utf-8",
//       platform: "yqq",
//       hostUin: 0,
//       sin: 0,
//       ein: 29,
//       sortId: 5,
//       categoryId: 10000000,
//       needNewCode: 0,
//       rnd: Math.random(),
//       format: "json"
//     }
//   );
//   console.log("getDiscList data is ", data);
//   const url = "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg";
//   return jsonp(url, data, options);
// }
//
// export function getSongList(disstid) {
//   const data = Object.assign({}, commonParams, {
//     disstid,
//     type: 1,
//     json: 1,
//     utf8: 1,
//     onlysong: 0,
//     platform: "yqq",
//     hostUin: 0,
//     needNewCode: 0
//   });
//
//   // const url = "https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg";
//   // return jsonp(url, data, options);
//
//   const url =
//     process.env.NODE_ENV === "production"
//       ? "https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg"
//       : "/api/getSongList";
//   // return axios
//   //   .get(url, {
//   //     params: data
//   //   })
//   //   .then(res => {
//   //     return Promise.resolve(res.data);
//   //   });
//   return request({
//     url,
//     method: "get",
//     params: data
//   });
// }

// apiRoutes.get('/getSongList', function (req, res) {
//   var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
//   axios.get(url, {
//     headers: {
//       referer: 'https://c.y.qq.com/',
//       host: 'c.y.qq.com'
//     },
//     params: req.query
//   }).then((response) => {
//     var ret = response.data
//     // 返回的是JSONP格式的话
//     if (typeof ret === 'string') {
//       var reg = /^\w+\(({.+})\)$/
//       var matches = ret.match(reg)
//       if (matches) {
//         ret = JSON.parse(matches[1])
//       }
//     }
//     res.json(ret)
//   }).catch((e)=> {
//     console.log(e)
//   })
//
// })
import jsonp from "@/common/js/jsonp";
import axios from "axios";
import { commonParams, opts } from "@/api/common-query.js";
import { parseJsonp } from "../common/js/myutils";

/**
 * jsonp 抓取推荐页轮播图数据
 * 接口：https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg
 */
export function getRecommend() {
  let url =
    "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
  let data = Object.assign({}, commonParams, {
    platform: "h5",
    uin: 0,
    needNewCode: 1
  });
  return jsonp(url, data, opts);
}

/**
 * axios 抓取推荐页列表数据
 * 接口：https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg
 * 接口提供方使用了 referer:https://y.qq.com/portal/playlist.html
 * axios 结合 proxy 代理后端请求
 */
export function getList() {
  const url = "/api/getList";
  let data = Object.assign({}, commonParams, {
    rnd: Math.random(),
    hostUin: 0,
    format: "json",
    platform: "yqq",
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29
  });
  return axios
    .get(url, {
      params: data
    })
    .then(function(response) {
      return Promise.resolve(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
}

/**
 * axios 抓取推荐页歌单数据
 * 接口：https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg
 * 提供方：https://y.qq.com/n/yqq/playlist/1471714611.html#
 */
export function getSongList(disstid) {
  const url = "/api/getSongList";
  const data = Object.assign({}, commonParams, {
    // rnd: Math.random(),
    // hostUin: 0,
    // format: "json",
    // platform: "yqq",
    // needNewCode: 0,
    // categoryId: 10000000,
    // sortId: 5,
    // sin: 0,
    // ein: 29
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: "yqq",
    hostUin: 0,
    needNewCode: 0
  });
  return axios
    .get(url, {
      params: data
    })
    .then(function(response) {
      return Promise.resolve(parseJsonp(response.data));
    })
    .catch(function(error) {
      console.log(error);
    });
  // let url = "https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg";
  // let data = Object.assign({}, commonParams, {
  //   disstid,
  //   type: 1,
  //   json: 1,
  //   utf8: 1,
  //   onlysong: 0,
  //   platform: "yqq",
  //   hostUin: 0,
  //   needNewCode: 0
  // });
  // let opts = Object.assign({}, opts, {
  //   param: "jsonpCallback",
  //   name: "playlistinfoCallback"
  // });
  // return jsonp(url, data, opts);
}
