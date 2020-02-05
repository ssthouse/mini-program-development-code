Component({
  properties: {},
  data: {
    imgSrc: '',
    requestQueue: []
  },
  methods: {
    loadImg(url, callback) {
      this.data.requestQueue.push({
        url,
        callback
      });
      if (this.data.requestQueue.length === 1) {
        this.loadNextImg()
      }
    },
    onImageLoaded(detail) {
      console.log(detail);
      const finishedItem = this.data.requestQueue.shift();
      finishedItem.callback();
      this.loadNextImg();
    },
    loadNextImg() {
      if (this.data.requestQueue.length === 0) {
        return;
      }
      this.setData({
        imgSrc: this.data.requestQueue[0].url
      })
    }
  }
});
