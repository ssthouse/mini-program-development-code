const regeneratorRuntime = require('../../lib/runtime'); // eslint-disable-line
const dao = require('../../dao/index')

const PAGE_SIZE = 20

const TAB_NAME = {
  DETAIL: 'detail',
  COMMENT: 'comment',
  RELATED_MV: 'relatedMV'
}

Page({
  data: {
    mvDetail: null,
    commentList: [],
    recommendMvList: [],
    currentTab: TAB_NAME.DETAIL,
    TAB_NAME
  },
  id: '', // MV id
  hasMoreComments: true,
  onLoad(options) {
    const id = options['id']
    if (id === undefined) {
      wx.navigateBack()
      return
    }
    this.id = id
    this.init()
  },
  async onReachBottom() {
  },
  async init() {
    this.fetchMvDetail()
    // this.fetchPlaylist()
  },
  async fetchMvDetail() {
    try {
      const mvDetail = await dao.getMvDetail(this.id)
      this.setData({
        mvDetail
      })
    } catch (e) {
      console.error(e)
      wx.showToast({
        duration: 2000,
        title: '获取MV信息失败'
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
        duration: 2000,
        title: '获取歌单信息失败'
      })
    }
  },
})
