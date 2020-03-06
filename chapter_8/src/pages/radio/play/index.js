const regeneratorRuntime = require('../../../lib/runtime'); // eslint-disable-line
const dao = require('../../../dao/index')
const playerManager = require('../../../utils/player-manager')
const PLAYER_EVENT_TYPE = playerManager.EVENT_TYPE

Page({
  data: {
    mainSong: null,
    radioDetail: null,
    isPlaying: false,
    musicUrl: '',
  },
  programId: null,
  // url参数: programId
  onLoad(options) {
    const programId = options['programId']
    if (programId === undefined) {
      wx.navigateBack()
      return
    }
    this.programId = programId
    this.init()
  },
  async init() {
    this.setData({
      radioDetail: getApp().globalData.selectedRadio
    })
    await this.fetchMusicUrl()
    playerManager.playMusic(this.data.musicUrl)
    this.initPlayerListener()
  },
  async fetchMusicUrl() {
    try {
      const globalData = getApp().globalData
      this.setData({
        mainSong: globalData.selectedProgram.mainSong
      })
      this.data.musicUrl = await dao.getMusicUrl(globalData.selectedProgram.mainSong.id, 128000)
    } catch (e) {
      console.error(e)
      wx.showToast({
        icon: 'none',
        duration: 2000,
        title: '获取音乐失败'
      })
    }
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
    const audioManager = wx.getBackgroundAudioManager()
    this.setData({
      duration: audioManager.duration,
      currentTime: audioManager.currentTime,
      bufferedTime: audioManager.buffered
    })
  },
  onSeekMusic(e) {
    const seekTime = e.detail.seekTime
    playerManager.seekMusic(seekTime)
  },
  onClickPause() {
    playerManager.pause()
  },
  onClickPlay() {
    playerManager.playMusic(this.data.musicUrl)
  },
})
