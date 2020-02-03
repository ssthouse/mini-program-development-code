const ImgURL = {
  COMPRESSED: 'https://raw.githubusercontent.com/ssthouse/mini-program-development-code/master/chapter_10/src/imgs/octocat-compressed.png',
  ORIGIN: 'https://raw.githubusercontent.com/ssthouse/mini-program-development-code/master/chapter_10/src/imgs/octocat.png'
}

Page({
  data: {
    imgUrl: ImgURL.COMPRESSED,
  },
  onLoad: function () {
    this.getImgLoader().loadImg(ImgURL.ORIGIN, () => {
      setTimeout(() => {
        this.setData({
          imgUrl: ImgURL.ORIGIN
        })
      }, 1000)
    })
  },
  getImgLoader() {
    return this.selectComponent('#img-loader')
  }
})
