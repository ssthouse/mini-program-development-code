/**
 * mv bean:
 * {
    "lyric": 10915413,
    "type": 5,
    "name": "Cry Cry Cry",
    "copywriter": "编辑推荐：Coldplay新单音乐录像带特别放送！",
    "picUrl": "http://p1.music.126.net/91YsyhuIRJzoW6YLYlJYcg==/109951164707027248.jpg",
    "canDislike": false,
    "trackNumberUpdateTime": null,
    "duration": 214000,
    "playCount": 21284,
    "subed": false,
    "artists": [{
        "id": 89365,
        "name": "Coldplay"
    }],
    "artistName": "Coldplay",
    "artistId": 89365,
    "alg": "featured"
}
 */

Component({
  properties: {
    lyric: {
      type: Object,
      value: {}
    },
    currentIndex: {
      type: Number,
      value: 0
    }
  },
  methods:{
    clickLyric() {
      this.triggerEvent('click-lyric')
    }
  }
})
