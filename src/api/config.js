export const commonParams = {
  g_tk: 5381, //  1928093487
  inCharset: "utf8",
  outCharset: "utf-8",
  notice: 0,
  format: "jsonp"
};

export const options = {
  param: "jsonpCallback",
  prefix: "getPlaylist"
};

// 基于jsonp方库，设置自定义的cbname
// 解决cbname未定义的问题
export const options1 = {
  param: "jsonpCallback",
  prefix: "playlistinfoCallback"
};
export const ERR_OK = 0;
