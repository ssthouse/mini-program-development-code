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
  data: {
    playTimeLabel: '00:00',
    durationTimeLabel: '00:00',
    sliderValue: 0,
  },
  seeking: false,
  observers: {
    'currentTime': function () {
      const newData = {
        playTimeLabel: util.formatMusicTime(this.data.currentTime),
      }
      if (!this.seeking) {
        newData.sliderValue = this.data.currentTime
      }
      this.setData(newData)
    },
    'duration': function () {
      this.setData({
        durationTimeLabel: util.formatMusicTime(this.data.duration)
      })
    }
  },
  methods: {
    onSeek(e) {
      this.seeking = false
      const seekTime = e.detail.value
      this.triggerEvent('seek-music', {
        seekTime
      })
    },
    onSeeking() {
      this.seeking = true
    }
  }
})
