const regeneratorRuntime = require('../../lib/runtime'); // eslint-disable-line
const dao = require('../../dao/index')

const TAB_NAME = {
  DETAIL: 'detail',
  COMMENT: 'comment',
  RELATED_MV: 'relatedMV'
}

Page({
  data: {
    mvDetail: null, // MV详情
    recommendMvList: [], // 推荐MV列表
    currentTab: TAB_NAME.DETAIL, // 当前选中的tab,默认为详情tab
    TAB_NAME // 为了在wxml中使用该变量
  },
  id: '', // MV id
  onLoad(options) {
    const id = options['id']
    if (id === undefined) {
      wx.navigateBack()
      return
    }
    this.id = id
    this.init()
  },
  init() {
    this.fetchMvDetail()
    this.fetchRecommendMvs()
  },
  async fetchMvDetail() {
    try {
      const mvDetail = await dao.getMvDetail(this.id)
      this.setData({
        mvDetail
      })
    } catch (e) {
      console.error(e)
      wx.showToast({
        icon: 'none',
        duration: 2000,
        title: '获取MV信息失败'
      })
    }
  },
  async fetchRecommendMvs() {
    try {
      const mvs = await dao.getSimilarMV(this.id)
      this.setData({
        recommendMvList: mvs
      })
    } catch (e) {
      console.error(e)
      wx.showToast({
        icon: 'none',
        duration: 2000,
        title: '获取相关MV失败'
      })
    }
  },
  onClickTab(e) {
    const tabName = e.currentTarget.dataset['tabName']
    this.setData({
      currentTab: tabName
    })
  }
})
