const regeneratorRuntime = require('../../lib/runtime'); // eslint-disable-line
const dao = require('../../dao/index')
const timeUtil = require('../../utils/time-util')

const PAGE_SIZE = 20

Page({
  data: {
    hotComments: [],
    comments: [],
    showLoading: false,
  },
  commentThreadId: '',
  // 当前评论加载位置
  offset: 0,
  hasMore: true,
  onLoad(options) {
    const commentThreadId = options['id']
    if (commentThreadId === undefined) {
      wx.navigateBack()
      return
    }
    this.commentThreadId = commentThreadId
    this.init()
  },
  async onReachBottom() {
    if(!this.hasMore) return
    this.setData({
      showLoading: true
    })
    await this.fetchComments()
    this.setData({
      showLoading: false
    })
  },
  async init() {
    this.fetchComments()
  },
  async fetchComments() {
    try {
      const response = await dao.getCommentList(this.commentThreadId, this.offset, PAGE_SIZE)
      const hotComments = response.hotComments && response.hotComments.map(comment => {
        return this.formatCommentTime(comment)
      })
      const newComments = response.comments.map(comment => {
        return this.formatCommentTime(comment)
      })
      const newData = {}
      if(hotComments) newData.hotComments = hotComments
      const comments = this.data.comments.concat(newComments)
      newData.comments = comments
      this.offset = comments.length
      this.hasMore = response.more
      this.setData(newData)
    } catch (e) {
      console.error(e)
      wx.showToast({
        duration: 2000,
        title: '获取评论信息失败'
      })
    }
  },
  formatCommentTime(comment) {
    comment.time = timeUtil.formatCommentTime(comment.time)
    return comment
  }
})
