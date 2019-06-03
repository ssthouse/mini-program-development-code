//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    itemList: [],
    imgList: []
  },
  onLoad: function () {
    for (let i = 0; i < 10; i++) {
      this.data.imgList.push({
        url: '/imgs/octocat.png'
      });
    }

    for (let i = 0; i < 10; i++) {
      this.data.itemList.push(1);
    }

    this.setData({
      itemList: this.data.itemList,
      imgList: this.data.imgList
    })
  },
  onReachBottom() {
    console.log(`reach bottom`);
    this.appendItem(100);
  },
  appendItem(count) {
    for (let i = 0; i < count; i++) {
      this.data.itemList.push({});
    }
    this.setData({
      itemList: this.data.itemList
    })
  }
});
