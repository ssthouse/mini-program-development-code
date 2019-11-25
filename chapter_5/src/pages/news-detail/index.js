const app = getApp()

Page({
  data: {
    newsUrl: ''
  },
  onLoad (options) {
    console.log(options)
    this.setData({
      newsUrl: options.newsUrl
    })
  }
})
