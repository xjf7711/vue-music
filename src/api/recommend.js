import jsonp from "../assets/js/jsonp";
import request from "../assets/js/request";
import { commonParams, options } from "./config";
import axios from "axios";

export function getRecommend() {
  const data = Object.assign({}, commonParams, {
    platform: "h5",
    uin: 0,
    needNewCode: 1,
    _: 1542893454334
  });
  const url =
    "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
  return jsonp(url, data, options);
}

export function getDiscList() {
  const data = Object.assign({}, commonParams, {
    platform: "yqq",
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: "json"
  });
  // const data = Object.assign({}, {
  //   g_tk: 5381,
  //   notice: 0,
  //   inCharset: 'utf8',
  //   outCharset: 'utf-8',
  //   platform: 'yqq',
  //   hostUin: 0,
  //   sin: 0,
  //   ein: 29,
  //   sortId: 5,
  //   categoryId: 10000000,
  //   needNewCode: 0,
  //   rnd: Math.random(),
  //   format: 'json'
  // })
  console.log("getDiscList data is ", data);
  const url =
    process.env.NODE_ENV === "production"
      ? "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg"
      : "/api/getDiscList";
  // var url = "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg";
  // axios.get(url, {
  //   headers: {
  //     referer: 'https://c.y.qq.com/',
  //     host: 'c.y.qq.com'
  //   },
  //   params: req.query
  // }).then((response) => {
  //   res.json(response.data)
  // }).catch((e) => {
  //   console.log(e)
  // })

  // return axios
  //   .get(url, {
  //     params: data
  //   })
  //   .then(res => {
  //     return Promise.resolve(res.data);
  //   });
  return request({
    url,
    method: "get",
    params: data
  });
}

export function getSongList(disstid) {
  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: "yqq",
    hostUin: 0,
    needNewCode: 0
  });

  // const url = "https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg";
  // return jsonp(url, data, options);

  const url =
    process.env.NODE_ENV === "production"
      ? "https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg"
      : "/api/getSongList";
  // return axios
  //   .get(url, {
  //     params: data
  //   })
  //   .then(res => {
  //     return Promise.resolve(res.data);
  //   });
  return request({
    url,
    method: "get",
    params: data
  })
}

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
