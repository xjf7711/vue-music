// import { commonParams } from "./config";
// // import jsonp from "../assets/js/jsonp";
// // import axios from "axios";
// import request from "../assets/js/request";
// export function getLyric(id) {
//   console.log("getLyric begins. id is " + id);
//   const url = // "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg";
//     process.env.NODE_ENV === "production"
//       ? "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg"
//       : "/api/lyric";
//
//   const data = Object.assign({}, commonParams, {
//     // songmid: mid,
//     platform: "h5",
//     uin: 0,
//     format: "jsonp",
//     hostUin: 0,
//     needNewCode: 1,
//     categoryId: 10000000,
//     pcachetime: +new Date(),
//     musicid: id,
//     songtype: 0,
//     _: 1542894664411
//     // jsonpCallback: "jsonp1"
//   });
//   console.log("getLyric data is ", data);
//   // return axios
//   //   .get(url, {
//   //     params: data
//   //   })
//   //   .then(res => {
//   //     console.log("getLyric axios res is ", res)
//   //     return Promise.resolve(res.data);
//   //   });
//   return request({
//     url,
//     method: "get",
//     params: data
//   });
//   // return jsonp(url, data, options);
// }
import axios from "axios";
import { commonParams } from "@/api/common-query.js";

/**
 * axios 抓取歌词数据
 * 接口：https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg
 * 原始地址：https://y.qq.com/portal/player.html
 * 接口提供方使用了 referer:https://y.qq.com/portal/player.html
 * axios 结合 node.js 代理后端请求
 */
export function getLyric(id) {
  let url = "/api/getLyric";
  let data = Object.assign({}, commonParams, {
    // nobase64: 1, // 很重要。等于1时会转成文字。
    // songmid: mid,
    musicid: id,
    format: "json",
    // pcachetime: +new Date(),
    platform: "yqq",
    // categoryId: 10000000,
    hostUin: 0,
    needNewCode: 0
  });
  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      // console.log("getLyric axios res is ", res)
      return Promise.resolve(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}
