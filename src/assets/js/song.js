import { getLyric } from "api/song";
import { ERR_OK } from "api/config";
import { Base64 } from "js-base64";

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric);
    }

    return new Promise((resolve, reject) => {
      getLyric(this.id).then(res => {
        console.log("getLyric(this.id) res is ", res);
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric);
          resolve(this.lyric);
        } else {
          reject("no lyric");
        }
      });
    });
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${
      musicData.albummid
    }.jpg?max_age=2592000`,
    // 歌源url
    // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    // url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}/${
    //   musicData.songid
    // }.m4a?guid=263427534&fromtag=66`,
    url:
      `http://223.111.154.154/amobile.music.tc.qq.com/C400${
        musicData.songmid
      }.m4a` +
      `?guid=5184045268&vkey=C5414C050409CCE3C059876DAE9ED8D0F4B8E8531A4F2E59620FCD624F8A75F00EAF9EB0E9D09A44B24FCFF6EA390F7A08AE523687BBD39D&uin=0&fromtag=66`
  });
}

function filterSinger(singer) {
  let ret = [];
  if (!singer) {
    return "";
  }
  singer.forEach(s => {
    ret.push(s.name);
  });
  return ret.join("/");
}
