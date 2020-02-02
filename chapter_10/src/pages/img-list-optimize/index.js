Page({
  data: {
    itemList: [],
    imgList: [],
  },
  onLoad: function () {
    this.initSwiperData()
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
  initSwiperData() { // 初始化图片数据
    for (let i = 0; i < 10; i++) { // 添加10条测试数据
      this.data.imgList.push({
        url: '/imgs/octocat.png' // 使用本地图片进行测试
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
