Page({
  data: {
    moneyNum: 0,
    suffixStr: '块钱',
    message: '',
    numAnimation: {}
  },
  onLoad: function() {
    setInterval(() => {
      this.data.moneyNum++
      this.setData({
        moneyNum: this.data.moneyNum,
        numAnimation: this.generateAnimation()
      })
    }, 1000)
  },
  generateAnimation() {
    const animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    animation
      .opacity(1)
      .step()
      .opacity(0)
      .step()
    return animation.export()
  }
})
