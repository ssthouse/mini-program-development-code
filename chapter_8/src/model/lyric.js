class LyricItem {
  constructor(content, second) {
    this.content = content
    this.second = second
  }

}

class Lyric {
  constructor(lyricItems) {
    this.lyricItems = lyricItems
  }
}

module.exports = {
  LyricItem,
  Lyric
}
