import { commonParams } from "./config";
// import axios from "axios";
import request from "../assets/js/request";
export function getLyric(mid) {
  const url =
    process.env.NODE_ENV === "production"
      ? "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg"
      : "/api/lyric";

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: "yqq",
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: "json"
  });
  console.log("getLyric data is ", data);
  // return axios
  //   .get(url, {
  //     params: data
  //   })
  //   .then(res => {
  //     console.log("getLyric axios res is ", res)
  //     return Promise.resolve(res.data);
  //   });
  return request({
    url,
    method: "get",
    params: data
  });
}
