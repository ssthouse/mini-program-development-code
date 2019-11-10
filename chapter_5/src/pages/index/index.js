//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    newsTag: [
      {
        key: 'top',
        title: '头条'
      }, {
        key: 'shehui',
        title: '社会'
      }, {
        key: 'guonei',
        title: '国内'
      }, {
        key: 'guoji',
        title: '国际'
      },
      {
        key: 'yule',
        title: '娱乐'
      },
      {
        key: 'tiyu',
        title: '体育'
      },
      {
        key: 'junshi',
        title: '军事'
      },
      {
        key: 'keji',
        title: '科技'
      },
      {
        key: 'caijing',
        title: '财经'
      },
      {
        key: 'shishang',
        title: '世上'
      }
    ]
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
