Component({
  properties: {},
  data: {
    imgSrc: '',
    requestQueue: [],
    isLoading: false
  },
  methods: {
    // public api begin
    loadImg(url, callback) {
      this.data.requestQueue.push({
        url,
        callback
      });
      this.triggerLoadingImg();
    },
    // public api end

    // private methods begin
    triggerLoadingImg() {
      if (this.data.isLoading) return;
      this.loadNextImg();
    },
    onImageLoaded(detail) {
      console.log(detail);
      const finishedItem = this.data.requestQueue.shift();
      finishedItem.callback();
      this.loadNextImg();
    },
    loadNextImg() {
      if (this.data.requestQueue.length === 0) {
        this.data.isLoading = false;
        return;
      }
      this.setData({
        imgSrc: this.data.requestQueue[0].url
      })
    }
    // private methods end
  }
});
