Page({
  data: {
    commentThreadId: ''
  },
  onLoad(options) {
    const commentThreadId = options['id']
    if (commentThreadId === undefined) {
      wx.navigateBack()
      return
    }
    this.setData({
      commentThreadId
    })
  },
})
