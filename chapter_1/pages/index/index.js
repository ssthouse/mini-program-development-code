Page({
  data: {
    moneyNum: 0,
    suffixStr: '块钱',
    message: ''
  },
  onLoad: function () {
    setInterval(() => {
      this.data.moneyNum ++
      this.setData({
        message: `${this.data.moneyNum} ` + this.data.suffixStr
      })
    }, 1000)
  },
})
