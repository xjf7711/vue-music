// import axios from "axios";
// import { commonParams } from "@/api/common-query.js";
import { commonParams, baseURL } from "./config";
import request from "src/assets/js/request";
import { parseJsonp } from "src/assets/js/utils";

/**
 * axios 抓取歌词数据
 * 接口：https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg
 * 原始地址：https://y.qq.com/portal/player.html
 * 接口提供方使用了 referer:https://y.qq.com/portal/player.html
 * axios 结合 node.js 代理后端请求
 */
export function getLyric(id) {
  //   console.log("getLyric begins. id is " + id);

  const url =
    process.env.NODE_ENV === "production"
      ? "/lyric/fcgi-bin/fcg_query_lyric.fcg"
      : "/api/getLyric";
  const data = Object.assign({}, commonParams, {
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
  //   console.log("getLyric data is ", data);
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
    .then(res => {
      console.log("api song.getLyric res is ", res);
      return Promise.resolve(parseJsonp(res.data));
    })
    .catch(err => {
      console.log(err);
    });
}
