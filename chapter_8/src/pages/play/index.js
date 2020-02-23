const regeneratorRuntime = require('../../lib/runtime'); // eslint-disable-line

const dao = require('../../dao/index')
const player = require('../../utils/player')
const lyricUtil = require('../../utils/lyric')

const DISPLAY_MODE = {
  COVER: 'cover',
  LYRIC: 'lyric'
}

Page({
  data: {
    /**
     {
    "name": "Only The Young (Featured in Miss Americana)",
    "id": 1419789491,
    "pst": 0,
    "t": 0,
    "ar": [{
        "id": 44266,
        "name": "Taylor Swift",
        "tns": [],
        "alias": []
    }],
    "alia": [],
    "pop": 100,
    "st": 0,
    "rt": "",
    "fee": 8,
    "v": 3,
    "crbt": null,
    "cf": "",
    "al": {
        "id": 85343659,
        "name": "Only The Young (Featured in Miss Americana)",
        "picUrl": "http://p2.music.126.net/5tD7nHxIVs6akS8PUXcCrw==/109951164663333512.jpg",
        "tns": [],
        "pic_str": "109951164663333512",
        "pic": 109951164663333500
    },
    "dt": 157544,
    "h": {
        "br": 320000,
        "fid": 0,
        "size": 6302868,
        "vd": -71203
    },
    "m": {
        "br": 192000,
        "fid": 0,
        "size": 3781738,
        "vd": -68766
    },
    "l": {
        "br": 128000,
        "fid": 0,
        "size": 2521173,
        "vd": -67563
    },
    "a": null,
    "cd": "01",
    "no": 1,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 1,
    "s_id": 0,
    "mark": 270336,
    "originCoverType": 0,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 7003,
    "mv": 10912774,
    "publishTime": 1580400000000
}
     */
    songDetail: null,
    isPlaying: false,
    musicUrl: '',
    lyric: null,
    lyricCurrentIndex: 0,
    displayMode: DISPLAY_MODE.LYRIC
  },
  lyricRefreshInterval: null,// 歌词进度刷新interval
  onLoad(options) {
    const songId = options['songId']
    if (!songId) {
      wx.navigateBack()
      return
    }
    this.fetchSongDetail(songId)
    this.fetchLyric(songId)
  },
  onClickPlay() {
    this.setData({
      isPlaying: true,
    })
    console.log('music url', this.data.musicUrl)
    player.playMusic(this.data.musicUrl)
    // 启动循环刷新interval
    setInterval(() => {
      this.refreshSongProgress()
    }, 1000)
  },
  // 刷新歌曲进度
  refreshSongProgress() {
    wx.getBackgroundAudioManager().onTimeUpdate((error) => {
      if (error) return
      const lyricIndex = this.findCurrentLyricIndex(this.data.lyric,
        wx.getBackgroundAudioManager().currentTime)
      this.setData({
        lyricCurrentIndex: lyricIndex
      })
    })
  },
  /**
   * 计算当前播放歌词的index
   * @param lyric: Lyric
   * @param currentTime: number current music play time
   */
  findCurrentLyricIndex(lyric, currentTime) {
    let lyricIndex = 0
    for (let i = 0; i < lyric.lyricItems.length; i++) {
      const lyricItem = lyric.lyricItems[i]
      if (lyricItem.second < currentTime) lyricIndex = i
    }
    return lyricIndex
  },
  onClickPause() {
    this.setData({
      isPlaying: false
    })
    player.pause()
  },
  async fetchSongDetail(songId) {
    try {
      const songDetail = await dao.getSongDetail(songId)
      this.setData({
        songDetail
      })
      console.log(songDetail.al.picUrl)
      const musicUrl = await dao.getMusicUrl(songId, songDetail.l.br)
      this.setData({
        musicUrl
      })
    } catch (e) {
      wx.showToast({
        icon: 'none',
        duration: 1500,
        title: '获取数据失败, 请稍后重试'
      });
      wx.navigateBack()
    }
  },
  async fetchLyric(songId) {
    const lyric = await dao.getLyric(songId)
    console.log('lyric', lyric)
    this.setData({
      lyric: lyricUtil.parseLyric(lyric.lrc.lyric)
    })
  }
})
