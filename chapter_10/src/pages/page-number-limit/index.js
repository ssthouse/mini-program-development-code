const pageController = require('./page-controller')


const PAGE_INDEX = 'pageIndex'
const DEFAULT_PAGE_INDEX = 1

Page({
  data: {
    pageIndex: DEFAULT_PAGE_INDEX,
    needBack: false,
  },
  onLoad: function (options) {
    console.log(options)
    if (options[PAGE_INDEX]) {
      this.setData({
        pageIndex: options[PAGE_INDEX],
        needBack: options[PAGE_INDEX] !== DEFAULT_PAGE_INDEX
      })
    }
  },
  onClickOpenNewPage() {
    const pageUrl = `/pages/page-number-limit/index?${PAGE_INDEX}=${+this.data.pageIndex + 1}`
    pageController.navigateTo(pageUrl)
  }
})
