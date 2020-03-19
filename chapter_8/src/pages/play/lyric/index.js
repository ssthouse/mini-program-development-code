
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
