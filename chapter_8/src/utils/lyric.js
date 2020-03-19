const lyric = require('../model/lyric')
const Lyric = lyric.Lyric
const LyricItem = lyric.LyricItem

function parseLyric(lrcContentStr) {
  let lrcList = [];
  let lrc_row = lrcContentStr.split("\n");
  for (let i in lrc_row) {
    if ((lrc_row[i].indexOf(']') === -1) && lrc_row[i]) {
      lrcList.push({ lrc: lrc_row[i] });
    } else if (lrc_row[i] !== "") {
      const tmp = lrc_row[i].split("]");
      for (let j in tmp) {
        // 解析歌词时间
        let tmp2 = tmp[j].substr(1, 8);
        tmp2 = tmp2.split(":");
        let lrc_sec = parseInt(tmp2[0] * 60 + tmp2[1] * 1);
        if (lrc_sec && (lrc_sec > 0)) {
          // 取出歌词左右的空格
          let lrc = (tmp[tmp.length - 1]).replace(/(^\s*)|(\s*$)/g, "");
          lrc && lrcList.push(new LyricItem(lrc, lrc_sec));
        }
      }
    }
  }
  return new Lyric(lrcList)
}

module.exports = {
  parseLyric
}
