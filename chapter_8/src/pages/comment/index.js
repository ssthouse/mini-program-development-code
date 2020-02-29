const regeneratorRuntime = require('../../lib/runtime'); // eslint-disable-line
const dao = require('../../dao/index')
const timeUtil = require('../../utils/time-util')

const PAGE_SIZE = 20

Page({
  data: {
    hotComments: [],
    comments: [],
    hasMore: true,
  },
  commentThreadId: '',
  // 当前评论加载位置
  offset: 0,
  onLoad(options) {
    const commentThreadId = options['id']
    if(commentThreadId === undefined) {
      wx.navigateBack()
      return
    }
    this.commentThreadId = commentThreadId
    this.init()
  },
  async init() {
    this.fetchComments()
  },
  async fetchComments() {
    try{
      const response = await dao.getCommentList(this.commentThreadId, this.offset, PAGE_SIZE)
      const hotComments = response.hotComments.map(comment => {
        return this.formatCommentTime(comment)
      })
      const comments = response.comments.map(comment => {
        return this.formatCommentTime(comment)
      })
      this.setData({
        comments: comments,
        hotComments: hotComments
      })
    }catch (e) {
      console.error(e)
      wx.showToast({
        duration: 2000,
        title: '获取评论信息失败'
      })
    }
  },
  formatCommentTime(comment){
    comment.time = timeUtil.formatCommentTime(comment.time)
    return comment
  }
})
