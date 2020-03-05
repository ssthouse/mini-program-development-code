const regeneratorRuntime = require('../../../lib/runtime'); // eslint-disable-line
const dao = require('../../../dao/index')

const PAGE_SIZE = 20

Page({
  data: {
    radioDetail: null,
    programList: [],
    showLoading: false,
  },
  radioId: null,
  offset: 0,
  hasMore: true,
  // url参数: radioId
  onLoad(options) {
    const radioId = options['radioId']
    if (radioId === undefined) {
      wx.navigateBack()
      return
    }
    this.radioId = radioId
    this.init()
  },
  async onReachBottom() {
    if (!this.hasMore) return
    this.setData({
      showLoading: true
    })
    await this.fetchPlaylist()
    this.setData({
      showLoading: false
    })
  },
  async init() {
    this.fetchRadioDetail()
    this.fetchRadioPrograms()
  },
  async fetchRadioDetail() {
    try {
      const response = await dao.getRadioDetail(this.radioId)
      this.setData({
        radioDetail: response.djRadio
      })
    } catch (e) {
      console.error(e)
      wx.showToast({
        icon: 'none',
        duration: 2000,
        title: '获取电台信息失败'
      })
    }
  },
  async fetchRadioPrograms() {
    this.setData({
      showLoading: true
    })
    try {
      const response = await dao.getRadioPrograms(this.radioId, this.offset, PAGE_SIZE)
      const newPrograms = response.programs
      let programList = []
      if (newPrograms) {
        programList = this.data.programList.concat(newPrograms)
      }
      this.hasMore = response.more
      this.offset = programList.length
      this.setData({
        programList
      })
    } catch (e) {
      console.error(e)
      wx.showToast({
        icon: 'none',
        duration: 2000,
        title: '获取节目单信息失败'
      })
    }
    this.setData({
      showLoading: false
    })
  },
  async onReachBottom() {
    this.fetchRadioPrograms()
  },
  onClickProgram(e) {
    const program = e.currentTarget.dataset['program']
    getApp().globalData.selectedRadio = this.data.radioDetail
    getApp().globalData.selectedProgram = program
    wx.navigateTo({
      url: `/pages/radio/play/index?programId=${program.id}`
    })
  }
})
