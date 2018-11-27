import { getLyric } from "src/api/song.js";
import { ERR_OK } from "src/api/config";
// import { parseJsonp } from "./myutils";
import Base64 from "js-base64";

export class SingerSong {
  constructor({ id, mid, singer, name, album, duration, img, url }) {
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.img = img;
    this.url = url;
  }
  // 获取歌词数据
  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric);
    }

    return new Promise((resolve, reject) => {
      getLyric(this.id).then(res => {
        console.log("getLyric(this.id) res is ", res);
        // const resultData = parseJsonp(res);
        console.log("res.retcode is ", typeof res.retcode);
        if (ERR_OK === res.retcode) {
          this.lyric = Base64.Base64.decode(res.lyric);
          console.log("this.lyric is ", this.lyric);
          resolve(this.lyric);
        } else {
          reject("no lyric");
        }
      });
    });
  }
}

export function createSingerSong(musicData) {
  return new SingerSong({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    img: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${
      musicData.albummid
    }.jpg?max_age=2592000`,
    // url: `http://10.151.0.22:9999/dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?fromtag=66`(可用)
    // url: `https://thirdparty.gtimg.com/${musicData.songid}.m4a?fromtag=38`(不可用)
    // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    // url: `http://ws.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=0&guid=5184045268` // 已失效
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}/${
      musicData.songid
    }.m4a?guid=5184045268&fromtag=66` // 部分失效
    // url:
    //   `http://223.111.154.154/amobile.music.tc.qq.com/C400${
    //     musicData.songmid
    //   }.m4a` +
    //   `?guid=5184045268&vkey=C5414C050409CCE3C059876DAE9ED8D0F4B8E8531A4F2E59620FCD624F8A75F00EAF9EB0E9D09A44B24FCFF6EA390F7A08AE523687BBD39D&uin=0&fromtag=66` // vkey要匹配
  });
}

// 处理 musicData.singer 数组，使其变为一个字符串
function filterSinger(singer) {
  let result = [];

  if (!singer) {
    return "";
  }

  singer.forEach(item => {
    result.push(item.name);
  });

  return result.join(" / ");
}
