Component({
  properties: {
    collectNum: {
      type: Number,
      value: 0
    },
    commentNum: {
      type: Number,
      value: 0
    },
    shareNum: {
      type: Number,
      value: 0
    },
    playlistId: {
      type: String,
      value: ''
    }
  },
  data: {},
  methods: {
    onClickComment() {
      this.triggerEvent('clickComment', this.data.playlistId)
    },
    onClickShare() {
      this.triggerEvent('clickShare', this.data.playlistId)
    }
  }
});
