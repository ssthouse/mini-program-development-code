//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    imgUrl: '',
    compressedImgUrl: '',
    originImgUrl: '',
  },
  onLoad: function () {
    this.getImgLoader().loadImg(this.originImgUrl, () => {
      this.setData({
        imgUrl: this.originImgUrl
      })
    })
  },
  getImgLoader() {
    return this.selectComponent('#img-loader')
  }
})
