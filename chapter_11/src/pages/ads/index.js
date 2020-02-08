Page({
  data: {},
  adsElement: null,
  onLoad: function (options) {
    this.adsElement = wx.createRewardedVideoAd({
      adUnitId: 'testId'
    })
    this.adsElement.load()
  },
  onClickBtn() {
    this.adsElement.show()
  }
})
