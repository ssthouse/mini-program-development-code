const regeneratorRuntime = require('../../../lib/runtime'); // eslint-disable-line
const dao = require('../../../dao/index')

const PAGE_SIZE = 20

Page({
  data: {
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
})
