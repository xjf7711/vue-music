import { commonParams } from "./config";
// import jsonp from "../assets/js/jsonp";
// import axios from "axios";
import request from "../assets/js/request";
export function getLyric(id) {
  console.log("getLyric begins. id is " + id);
  const url = // "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg";
    process.env.NODE_ENV === "production"
      ? "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg"
      : "/api/lyric";

  const data = Object.assign({}, commonParams, {
    // songmid: mid,
    platform: "h5",
    uin: 0,
    format: "jsonp",
    hostUin: 0,
    needNewCode: 1,
    categoryId: 10000000,
    pcachetime: +new Date(),
    musicid: id,
    songtype: 0,
    _: 1542894664411
    // jsonpCallback: "jsonp1"
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
  // return jsonp(url, data, options);
}
