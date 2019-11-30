const regeneratorRuntime = require('../../lib/runtime') // eslint-disable-line

const app = getApp()

const mockNewsList = require('./newsList').newsList

// author_name: "投资者网"
// category: "头条"
// date: "2019-11-12 00:36"
// thumbnail_pic_s: "http://02imgmini.eastday.com/mobile/20191112/20191112003625_40fba76206188cebb3be80eb28ac5881_5_mwpm_03200403.jpg"
// thumbnail_pic_s02: "http://02imgmini.eastday.com/mobile/20191112/20191112003625_40fba76206188cebb3be80eb28ac5881_4_mwpm_03200403.jpg"
// thumbnail_pic_s03: "http://02imgmini.eastday.com/mobile/20191112/20191112003625_40fba76206188cebb3be80eb28ac5881_1_mwpm_03200403.jpg"
// title: "以信为基，服务美好生活 ——中国信托业2019投资者教育活动（西安专场） 成功举办"
// uniquekey: "14c95f67552dc7372229849ee0f28a19"
// url: "http://mini.eastday.com/mobile/191112003625562.html"

Page({
  data: {
    currentTag: 'top',
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
        title: '时尚'
      }
    ],
    newsList: []
  },
  onLoad () {
    this.initNewsList()
  },
  async initNewsList () {
    try {
      const newsList = await this.fetchNews(this.data.currentTag)
      this.setData({
        newsList
      })
    } catch (e) {
      wx.showToast({
        icon: 'none',
        duration: 2000,
        title: `获取新闻列表失败: ${e.message}`
      });
    }
  },
  async onClickNewsTag (event) {
    const newsTag = event.currentTarget.dataset['tagId']
    this.setData({
      currentTag: newsTag
    })
    try {
      const news = await this.fetchNews(newsTag)
      this.setData({
        newsList: news
      })
    } catch (e) {
      wx.showToast({
        icon: 'none',
        duration: 2000,
        title: e.message
      })
    }
  },
  onClickNewsItem (event) {
    const newsItem = event.currentTarget.dataset.news
    console.log(newsItem)
    wx.navigateTo({
      url: `/pages/news-detail/index?newsUrl=${newsItem.url}`
    })
  },
  async fetchNews (newsTag) {
    // return mockNewsList
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'http://v.juhe.cn/toutiao/inde2x',
        method: 'GET',
        data: {
          type: newsTag,
          key: '07a9ba0abccf6344cbf78cb72ff4121b'
        },
        success (res) {
          if (res.statusCode !== 200) {
            reject(new Error('网络请求错误,请稍后再试'))
          }
          const rspBody = res.data
          const news = rspBody.result.data
          resolve(news)
        },
        fail () {
          reject(new Error('网络请求错误,请稍后再试'))
        }
      })
    })
  }
})
