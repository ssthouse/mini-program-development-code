const regeneratorRuntime = require('../../lib/runtime'); // eslint-disable-line

const dao = require('../../dao/index')
const playerManager = require('../../utils/player-manager')
const PLAYER_EVENT_TYPE = playerManager.EVENT_TYPE
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
    displayMode: DISPLAY_MODE.COVER
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
    this.initPlayerListener()
  },
  onUnload() {
    playerManager.unregisterEvent(PLAYER_EVENT_TYPE.ON_PLAY, this.onPlay)
    playerManager.unregisterEvent(PLAYER_EVENT_TYPE.ON_PAUSE, this.onPause)
    playerManager.unregisterEvent(PLAYER_EVENT_TYPE.ON_TIME_UPDATE, this.onPlayerTimeUpdate)
  },
  initPlayerListener() {
    playerManager.registerEvent(PLAYER_EVENT_TYPE.ON_PLAY, this.onPlay)
    playerManager.registerEvent(PLAYER_EVENT_TYPE.ON_PAUSE, this.onPause)
    playerManager.registerEvent(PLAYER_EVENT_TYPE.ON_TIME_UPDATE, this.onPlayerTimeUpdate)
  },
  onPlay(){
    this.setData({
      isPlaying: true
    })
  },
  onPause(){
    this.setData({
      isPlaying: false
    })
  },
  onPlayerTimeUpdate() {
    const lyricIndex = this.findCurrentLyricIndex(this.data.lyric,
      wx.getBackgroundAudioManager().currentTime)
    this.setData({
      lyricCurrentIndex: lyricIndex
    })
  },
  onClickPlay() {
    console.log('music url', this.data.musicUrl)
    playerManager.playMusic(this.data.musicUrl)
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
    playerManager.pause()
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
  },
  onCloseLyric() {
    this.setData({
      displayMode: DISPLAY_MODE.COVER
    })
  },
  onCloseCover() {
    this.setData({
      displayMode: DISPLAY_MODE.LYRIC
    })
  }
})
