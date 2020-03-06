const regeneratorRuntime = require('../../../lib/runtime'); // eslint-disable-line
const dao = require('../../../dao/index')
const playerManager = require('../../../utils/player-manager')

Page({
  data: {},
  programId: null,
  musicUrl: '',
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
    await this.fetchMusicUrl()
    playerManager.playMusic(this.musicUrl)
  },
  async fetchMusicUrl() {
    try {
      const globalData = getApp().globalData
      this.musicUrl = await dao.getMusicUrl(globalData.selectedProgram.mainSong.id, 128000)
    } catch (e) {
      console.error(e)
      wx.showToast({
        icon: 'none',
        duration: 2000,
        title: '获取音乐失败'
      })
    }
  },
})
