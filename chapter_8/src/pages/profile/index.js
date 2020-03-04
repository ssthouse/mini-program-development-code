const regeneratorRuntime = require('../../lib/runtime'); // eslint-disable-line
const dao = require('../../dao/index')

const PAGE_SIZE = 20

Page({
  data: {
    profile: null,
    playlists: [],// 用户歌单列表
    showLoading: false,
  },
  uid: '',
  // 当前评论加载位置
  offset: 0,
  hasMore: true,
  onLoad(options) {
    const uid = options['uid']
    if (uid === undefined) {
      wx.navigateBack()
      return
    }
    this.uid = uid
    this.init()
  },
  async onReachBottom() {
    if(!this.hasMore) return
    this.setData({
      showLoading: true
    })
    await this.fetchPlaylist()
    this.setData({
      showLoading: false
    })
  },
  async init() {
    this.fetchUserProfile()
    this.fetchPlaylist()
  },
  async fetchUserProfile() {
    try {
      const response = await dao.getUserProfile(this.uid)
      this.setData({
        profile: response.profile
      })
    } catch (e) {
      console.error(e)
      wx.showToast({
        icon: 'none',
        duration: 2000,
        title: '获取用户信息失败'
      })
    }
  },
  async fetchPlaylist() {
    try {
      const response = await dao.getUserPlaylist(this.uid, this.offset, PAGE_SIZE)
      const newPlaylists = response.playlist
      const playlists = this.data.playlists.concat(newPlaylists)
      this.setData({
        playlists
      })
      this.offset = playlists.length;
      this.hasMore = response.more
    } catch (e) {
      console.error(e)
      wx.showToast({
        icon: 'none',
        duration: 2000,
        title: '获取歌单信息失败'
      })
    }
  },
  onClickPlaylist(e) {
    const playlistId = e.currentTarget.dataset['playlistId']
    wx.navigateTo({
      url: `/pages/playlist/index?playlistId=${playlistId}`
    })
  }
})
