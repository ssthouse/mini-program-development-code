const MAX_PAGE_SIZE = 10

function navigateTo(pageUrl) {
  // 如page列表已到达上限, 将页面push到app.pageList中, 当前页面redirectTo到新页面
  const pageSize = getCurrentPages().length
  if (pageSize < MAX_PAGE_SIZE) {
    wx.navigateTo({url: pageUrl})
  } else {
    wx.redirectTo({url: pageUrl})
  }
  getApp().globalData.pageList.push(pageUrl)
}

function navigateBack() {
  // 如果page stack中页面数小于app.pageList中数目 => 将app.pageList中页面pop出去, 当前页面redirect到pop出来的url
  if (getCurrentPages().length < getApp().globalData.pageList.length) {
    const pageList = getApp().globalData.pageList
    pageList.pop()
    const url = pageList[pageList.length - 1]
    wx.redirectTo({url: url})
  } else {
    // 如果两个数目一致, app.pageList pop, 当前页面navigateBack
    const url = getApp().globalData.pageList.pop();
    wx.navigateBack()
  }
}

module.exports = {
  navigateTo,
  navigateBack
}
