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
      this.triggerEvent('click-comment', this.data.playlistId)
    },
    onClickShare() {
      this.triggerEvent('click-share', this.data.playlistId)
    }
  }
});
