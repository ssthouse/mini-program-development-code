const util = require('../../../utils/util')

Component({
  properties: {
    currentTime: {
      type: Number,
      value: 0
    },
    duration: {
      type: Number,
      value: 0
    },
    bufferedTime: {
      type: Number,
      value: 0
    }
  },
  data:{
   playTimeLabel: '00:00',
   durationTimeLabel: '00:00'
  },
  observers: {
    'currentTime' : function() {
      this.setData({
        playTimeLabel: util.formatMusicTime(this.data.currentTime)
      })
    },
    'duration' : function() {
      this.setData({
        durationTimeLabel: util.formatMusicTime(this.data.duration)
      })
    }
  },
  methods: {
    onSeek(e) {
      const seekTime = e.detail.value
      this.triggerEvent('seek-music', {
        seekTime
      })
    }
  }
})
