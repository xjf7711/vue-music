import jsonp from "src/assets/js/jsonp";
// import { commonParams, options } from "@/api/common-query.js";
import { commonParams, options } from "./config";
// import axios from "axios";
import request from "src/assets/js/request";
import { parseJsonp } from "src/assets/js/utils";

/**
 * jsonp 抓取热门搜索数据
 * 接口：https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg
 * 提供方：https://m.y.qq.com/#search
 */
export function getHotKey() {
  let url = "https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg";
  let data = Object.assign({}, commonParams, {
    uin: 0,
    format: "json",
    platform: "h5",
    needNewCode: 1
  });
  return jsonp(url, data, options);
}

/**
 * jsonp 抓取搜索检索数据
 * 接口：https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp
 * 提供方：https://m.y.qq.com/#search
 * add by xjf 2018/11/26 接口已禁止跨域访问。
 * 改为proxy代理
 */
export function search(query, page, perpage, zhida) {
  let url =
    process.env.NODE_ENV === "production"
      ? "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp"
      : "/api/search";
  let data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    n: perpage,
    perpage,
    zhidaqu: 1,
    catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: "utf-8",
    sem: 1,
    aggr: 0,
    uin: 0,
    platform: "h5",
    uid: 0,
    needNewCode: 1,
    remoteplace: "txt.mqq.all"
  });
  // return jsonp(url, data, options);
  // return axios
  //   .get(url, {
  //     params: data
  //   })
  return request({
    method: "get",
    url,
    params: data
  })
    .then(function(response) {
      console.log("api search response.data is ", typeof response.data);
      return Promise.resolve(parseJsonp(response.data));
    })
    .catch(function(error) {
      console.log(error);
    });
}
