const regeneratorRuntime = require('../../lib/runtime'); // eslint-disable-line

const dao = require('../../dao/index')

Page({
  data: {
    loading: true,
    playList: [],
    newSongList: [],
    mvList: [],
    djList: [],
  },
  onLoad() {
    this.initData()
  },
  async initData() {
    try {
      const [playList, newSongList, mvList, djList] = await Promise.all([
        dao.getRecommendPlaylist(),
        dao.getRecommendNewSong(),
        dao.getRecommendMV(),
        dao.getRecommendDJ()
      ])
      this.setData({
        loading: false,
        playList,
        newSongList,
        mvList,
        djList,
      })
    } catch (e) {
      wx.showToast({
        icon: 'none',
        duration: 1500,
        title: '获取数据失败, 请稍后重试'
      });
    }
  }
})
