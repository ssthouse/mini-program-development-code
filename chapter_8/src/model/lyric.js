class LyricItem {
  constructor(content, second) {
    this.content = content
    this.second = second
  }

}

class Lyric {
  constructor(lyricItems, canScroll) {
    this.lyricItems = lyricItems
    this.canScroll = canScroll
  }
}

module.exports = {
  LyricItem,
  Lyric
}
