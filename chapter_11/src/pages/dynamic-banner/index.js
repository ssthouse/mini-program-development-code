var regeneratorRuntime = require('../../lib/runtime'); // eslint-disable-line

Page({
  data: {
    bannerItems: [
      {
        imgUrl: 'https://raw.githubusercontent.com/ssthouse/mini-program-development-code/master/chapter_10/src/imgs/octocat.png',
        // TODO: 自定义banner属性
      },
      {
        imgUrl: 'https://raw.githubusercontent.com/ssthouse/mini-program-development-code/master/chapter_10/src/imgs/octocat.png'
      },
      {
        imgUrl: 'https://raw.githubusercontent.com/ssthouse/mini-program-development-code/master/chapter_10/src/imgs/octocat.png'
      },
    ],
    previousMargin: 22,
    nextMargin: 750 - 544 - 22 - 22,
  },
  async onLoad(options) {
    this.setData({
      bannerItems: await this.getBannerItems()
    })
  },
  async getBannerItems() {
    return new Promise((resolve) => {
      wx.request({
        //仅为示例，并非真实的接口地址
        url: '获取banner数据的后端url',
        success: function success(res) {
          resolve(res.data)
        }
      });
    })
  }
})
