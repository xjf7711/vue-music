// import axios from "axios";
// import { commonParams } from "@/api/common-query.js";
import { commonParams, baseURL } from "./config";
import request from "src/assets/js/request";
import { parseJsonp } from "src/assets/js/utils";
// import axios from "axios";

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

/* 获取播放源连接密钥 */
export function getVkey(songmid) {
  const url =
    process.env.NODE_ENV === "production"
      ? "/base/fcgi-bin/fcg_music_express_mobile3.fcg"
      : "/api/vKey";

  const params = Object.assign({}, commonParams, {
    songmid,
    filename: `C400${songmid}.m4a`,
    guid: 1472133172,
    uin: 3051522991,
    platform: "yqq",
    needNewCode: 0,
    cid: 205361747
    // format: "jsonp"
  });

  // return axios
  //   .get(url, {
  //     params: data
  //   })
  return request({
    method: "get",
    baseURL,
    url,
    params
  }).then(res => {
    console.log("getVkey songmid request res is ", res);
    return Promise.resolve(res.data);
  });
}

export function getPlaySongVkey() {
  const params = {
    callback: "getplaysongvkey4977854311338388",
    g_tk: 5381,
    jsonpCallback: "getplaysongvkey4977854311338388",
    loginUin: 0,
    hostUin: 0,
    format: "jsonp",
    inCharset: "utf8",
    outCharset: "utf - 8",
    notice: 0,
    platform: "yqq",
    needNewCode: 0,
    data: {
      req: {
        module: "CDN.SrfCdnDispatchServer",
        method: "GetCdnDispatch",
        param: {
          guid: "4505128350",
          calltype: 0,
          userip: ""
        }
      },
      req_0: {
        module: "vkey.GetVkeyServer",
        method: "CgiGetVkey",
        param: {
          guid: "4505128350",
          songmid: ["001TXSYu1Gwuwv"],
          songtype: [0],
          uin: "0",
          loginflag: 1,
          platform: "20"
        }
      },
      comm: {
        uin: 0,
        format: "json",
        ct: 20,
        cv: 0
      }
    }
  };
  const url =
    process.env.NODE_ENV === "production"
      ? "/cgi-bin/musicu.fcg"
      : "/api/getPlaySongVkey";
  return request({
    method: "get",
    url,
    params
  }).then(res => {
    /**
     * getplaysongvkey4977854311338388({"req":{"data":{"expiration":86400,"freeflowsip":["http://58.216.106.13/amobile.music.tc.qq.com/","http://58.216.106.14/amobile.music.tc.qq.com/","http://58.216.106.15/amobile.music.tc.qq.com/"],"keepalivefile":"C400004TsFuW2mZbRR.m4a?guid=4505128350&vkey=1A4D773C2DC20755E72BCC8D195E78ADA9A720B5EAD7053E8B1B3B9D8382A6B2A4D91B4D69A929C845AD687DFA75C85521218ED6F8E5B724&uin=0&fromtag=3","msg":"ok","retcode":0,"servercheck":"f36aecc899ec02f6813218fc87aa1d34","sip":["http://dl.stream.qqmusic.qq.com/","http://isure.stream.qqmusic.qq.com/","http://58.216.106.13/amobile.music.tc.qq.com/","http://58.216.106.14/amobile.music.tc.qq.com/","http://58.216.106.15/amobile.music.tc.qq.com/"],"testfile2g":"C400003mAan70zUy5O.m4a?guid=4505128350&vkey=3EACF87057A04A4E590AE357FB4C51AB8F5FFEA5B68DE2E2C5D7976D8F04BFD8CB2E0D7ACD834004F9A9E00CEECFDD412A768A63623822C5&uin=0&fromtag=3","testfilewifi":"C400003mAan70zUy5O.m4a?guid=4505128350&vkey=3EACF87057A04A4E590AE357FB4C51AB8F5FFEA5B68DE2E2C5D7976D8F04BFD8CB2E0D7ACD834004F9A9E00CEECFDD412A768A63623822C5&uin=0&fromtag=3","uin":"","userip":"49.77.188.198","vkey":"7FCE763AA6F9E9029AC85CD687365A7D4137F86ADE54C538778A2BA1AFFEBF39B1F23E2135C4C923A4AADEADFA2CC435AAB66040F1AAFC57"},"code":0},"req_0":{"data":{"expiration":80400,"login_key":"","midurlinfo":[{"common_downfromtag":0,"errtype":"","filename":"C400001TXSYu1Gwuwv.m4a","flowfromtag":"","flowurl":"","hisbuy":0,"hisdown":0,"isbuy":0,"isonly":0,"onecan":0,"opi128kurl":"","opi192koggurl":"","opi192kurl":"","opi48kurl":"","opi96kurl":"","opiflackurl":"","p2pfromtag":0,"pdl":0,"pneed":0,"pneedbuy":0,"premain":0,"purl":"C400001TXSYu1Gwuwv.m4a?guid=4505128350&vkey=A68851693C228FC7EA001FB4A5B48C7A84E2F1566696D853117F6F7FD50DC2BD96D7859FA9ED36192440363A853054D750892EBF7E2C513D&uin=0&fromtag=66","qmdlfromtag":0,"result":0,"songmid":"001TXSYu1Gwuwv","tips":"","uiAlert":0,"vip_downfromtag":0,"vkey":"A68851693C228FC7EA001FB4A5B48C7A84E2F1566696D853117F6F7FD50DC2BD96D7859FA9ED36192440363A853054D750892EBF7E2C513D","wififromtag":"","wifiurl":""}],"msg":"","retcode":0,"servercheck":"f36aecc899ec02f6813218fc87aa1d34","sip":["http://dl.stream.qqmusic.qq.com/","http://isure.stream.qqmusic.qq.com/"],"testfile2g":"C400003mAan70zUy5O.m4a?guid=4505128350&vkey=332E9FB0C78662A5E22190FEDCA7D3924A01162605B609A9A3661DE6AC33EBB9D989E3E7566A496A6FFE22365C9D3ECC91787351338437B4&uin=&fromtag=3","testfilewifi":"C400003mAan70zUy5O.m4a?guid=4505128350&vkey=332E9FB0C78662A5E22190FEDCA7D3924A01162605B609A9A3661DE6AC33EBB9D989E3E7566A496A6FFE22365C9D3ECC91787351338437B4&uin=&fromtag=3","thirdip":["",""],"uin":"","verify_type":0},"code":0},"code":0,"ts":1543804405110})
     * */
    // console.log("getVkey songmid request res is ", res);
    return Promise.resolve(res.data);
  });
}
