//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World'
  },
  callNewsApi () {
    wx.request({
      url: 'http://v.juhe.cn/toutiao/index', //仅为示例，并非真实的接口地址
      method: 'GET',
      data: {
        type: 'top',
        key: '07a9ba0abccf6344cbf78cb72ff4121b'
      },
      success (res) {
        console.log(res.data)
      }
    })
  }
})
