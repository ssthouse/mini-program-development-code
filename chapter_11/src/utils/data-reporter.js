function getUserId() {
  // 需要登陆获取用户的openid
  return ''
}

function reportOpenPage(pageId) {
  wx.request({
    url: 'page上报url', //仅为示例，并非真实的接口地址
    data: {
      pageId,
      userId: getUserId()
    },
    success (res) {
      console.log('数据上报成功')
    }
  })
}

function reportClickBtn(btnId) {
  wx.request({
    url: 'btn上报url', //仅为示例，并非真实的接口地址
    data: {
      btnId,
      userId: getUserId()
    },
    success (res) {
      console.log('数据上报成功')
    }
  })
}

module.exports = {
  reportOpenPage,
  reportClickBtn
}
