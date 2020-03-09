const regeneratorRuntime = require('../../lib/runtime'); // eslint-disable-line

const dao = require('../../dao/index')

Page({
  data: {
    currentTabId: 'recommend'
  },
  onLoad() {
  },
  onChangeTab(e) {
    const tabId = e.detail
    this.setData({
      currentTabId: tabId
    })
  }
})
