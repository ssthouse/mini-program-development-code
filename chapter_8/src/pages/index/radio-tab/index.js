const regeneratorRuntime = require('../../../lib/runtime'); // eslint-disable-line
const dao = require('../../../dao/index')

const LIMIT = 20

Component({
  data: {
    hasMore: true,
    radioList: [],
    showLoading: false,
    offset: 0,
  },
  lifetimes: {
    attached() {
      this.fetchRecommendPrograms()
      this.fetchRecommendRadios()
    }
  },
  methods: {
    async fetchRecommendPrograms() {
      this.setData({
        showLoading: true
      })
      try {
        const response = await dao.getPlaylistByCategory(this.data.selectedCategory, this.data.offset, LIMIT)
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
          icon: 'none',
          duration: 2000,
          title: '获取歌单信息失败'
        })
      }
      this.setData({
        showLoading: false
      })
    },
    async fetchRecommendRadios() {
      this.setData({
        showLoading: true
      })
      try {
        const response = await dao.getPlaylistByCategory(this.data.selectedCategory, this.data.offset, LIMIT)
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
          icon: 'none',
          duration: 2000,
          title: '获取歌单信息失败'
        })
      }
      this.setData({
        showLoading: false
      })
    },
  },
})
