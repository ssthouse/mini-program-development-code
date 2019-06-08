Page({
  data: {
    itemList: [],
  },
  onLoad: function () {
    this.initItemList();
    this.setData({
      itemList: this.data.itemList,
      imgList: this.data.imgList
    })
  },
  initItemList() {
    for (let i = 0; i < 10; i++) {
      this.data.itemList.push({
        url: `/imgs/octocat.png`,
        content: `第 ${i + 1} 个元素`
      });
    }
  },
  onReachBottom() {
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
