const regeneratorRuntime = require('../../lib/runtime'); // eslint-disable-line
const dao = require('../../dao/index')

const PAGE_SIZE = 20

const TAB_NAME = {
  DETAIL: 'detail',
  COMMENT: 'comment',
  RELATED_MV: 'relatedMV'
}

Page({
  data: {
    mvDetail: null,
    commentList: [],
    recommendMvList: [],
    currentTab: TAB_NAME.DETAIL,
    TAB_NAME
  },
  id: '', // MV id
  hasMoreComments: true,
  onLoad(options) {
    const id = options['id']
    if (id === undefined) {
      wx.navigateBack()
      return
    }
    this.id = id
    this.init()
  },
  async onReachBottom() {
  },
  async init() {
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
