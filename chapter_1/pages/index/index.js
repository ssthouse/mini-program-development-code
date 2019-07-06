Page({
  data: {
    motto: 'Hello World',
  },
  onLoad: function () {
    setInterval(() => {
      this.setData({
        motto: 'Hello World ' + Math.floor(Math.random() * 10)
      })
    }, 1000)
  },
})
