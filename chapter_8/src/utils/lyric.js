const lyric = require('../model/lyric')
const Lyric = lyric.Lyric
const LyricItem = lyric.LyricItem

function parseLyric(lrcContentStr) {
  let lrcList = [];
  let lrc_row = lrcContentStr.split("\n");
  for (let i in lrc_row) {
    if ((lrc_row[i].indexOf(']') === -1) && lrc_row[i]) {
      lrcList.push({lrc: lrc_row[i]});
    } else if (lrc_row[i] !== "") {
      const tmp = lrc_row[i].split("]");
      for (let j in tmp) {
        let tmp2 = tmp[j].substr(1, 8);
        tmp2 = tmp2.split(":");
        let lrc_sec = parseInt(tmp2[0] * 60 + tmp2[1] * 1);
        if (lrc_sec && (lrc_sec > 0)) {
          let lrc = (tmp[tmp.length - 1]).replace(/(^\s*)|(\s*$)/g, "");
          lrc && lrcList.push({lrc_sec: lrc_sec, lrc: lrc});
          lrc && lrcList.push(new LyricItem(lrc, lrc_sec));
        }
      }
    }
  }
  return new Lyric(lrcList, true)
}

module.exports = {
  parseLyric
}
