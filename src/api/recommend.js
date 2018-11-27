import jsonp from "src/assets/js/jsonp";
// import axios from "axios";
import request from "src/assets/js/request";
// import { commonParams, options } from "src/api/common-query.js";
import { commonParams, options, baseURL } from "./config.js";
import { parseJsonp } from "src/assets/js/utils";

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
  return jsonp(url, data, options);

  // 以下代码无效。代理有问题？？？
  // const params = Object.assign({}, commonParams, {
  //   platform: "h5",
  //   uin: 0,
  //   needNewCode: 1,
  //   jsonpCallback: "getPlaylist"
  //   // _: 1542893454334
  // });
  // return request({
  //   url: "/api/getRecommend/",
  //   method: "get",
  //   params
  // });
}

/**
 * axios 抓取推荐页列表数据
 * 接口：https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg
 * 接口提供方使用了 referer:https://y.qq.com/portal/playlist.html
 * axios 结合 proxy 代理后端请求
 */
export function getList() {
  console.log("getList begins. ");
  const url =
    process.env.NODE_ENV === "production"
      ? "/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg"
      : "/api/getList";
  // console.log("api recommend getList url is " + url);
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
  console.log("api recommend getList data is ", data);
  // return axios
  //   .get(url, {
  //     params: data
  //   })
  return request({
    baseURL,
    url,
    method: "get",
    params: data
  })
    .then(function(response) {
      console.log("api recommend getList response is ", response);
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
  const url =
    process.env.NODE_ENV === "production"
      ? "/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg"
      : "/api/getSongList";
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
  // return axios
  //   .get(url, {
  //     params: data
  //   })
  return request({
    baseURL,
    url,
    method: "get",
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
  // let options = Object.assign({}, options, {
  //   param: "jsonpCallback",
  //   name: "playlistinfoCallback"
  // });
  // return jsonp(url, data, options);
}
