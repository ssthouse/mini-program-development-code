const pageController = require('./page-controller')


const DEFAULT_PAGE_INDEX = 1

Page({
  data: {
    pageIndex: DEFAULT_PAGE_INDEX,
    needBack: false,
  },
  onLoad: function (options) {
    this.setData({
      pageIndex: getApp().globalData.pageList.length
    })
  },
  onClickOpenNewPage() {
    const pageUrl = `/pages/page-number-limit/index?pageIndex=${+this.data.pageIndex + 1}`
    pageController.navigateTo(pageUrl)
  }
})
