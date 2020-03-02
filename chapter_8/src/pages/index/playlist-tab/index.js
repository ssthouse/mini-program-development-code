const regeneratorRuntime = require('../../../lib/runtime'); // eslint-disable-line
const dao = require('../../../dao/index')

const LIMIT = 20

Component({
  data: {
    category: '全部歌单',
    hasMore: true,
    playlists: [],
    showLoading: false,
    offset: 0,
  },
  lifetimes: {
    attached() {
      this.fetchPlaylist()
    }
  },
  methods: {
    async fetchPlaylist() {
      this.setData({
        showLoading: true
      })
      try {
        const response = await dao.getPlaylistByCategory(this.data.category, this.data.offset, LIMIT)
        const newPlaylists = response.playlists
        const newData = {
          hasMore: response['more'],
        }
        if (newPlaylists) {
          newData.playlists = this.data.playlists.concat(newPlaylists)
          this.data.offset = newData.playlists.length
        }
        this.setData(newData)
      } catch (e) {
        wx.showToast({
          duration: 2000,
          title: '获取歌单信息失败'
        })
      }
      this.setData({
        showLoading: false
      })},
    onReachBottom() {
      this.fetchPlaylist()
    }
  }
})
