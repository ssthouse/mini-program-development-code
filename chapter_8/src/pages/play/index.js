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
    songDetail: null,
    isPlaying: false,
    musicUrl: '',
    lyric: null,
    lyricCurrentIndex: 0,
    displayMode: DISPLAY_MODE.COVER,
    // 用于显示播放进度
    currentTime: 0,
    duration: 0,
    downloadPercent: 0,
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
    const audioManager = wx.getBackgroundAudioManager()
    this.setData({
      isPlaying: true,
      duration: audioManager.duration,
      currentTime: audioManager.currentTime,
      bufferedTime: audioManager.buffered
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
    const audioManager = wx.getBackgroundAudioManager()
    this.setData({
      lyricCurrentIndex: lyricIndex,
      duration: audioManager.duration,
      currentTime: audioManager.currentTime,
      bufferedTime: audioManager.buffered
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
