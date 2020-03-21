const regeneratorRuntime = require('../../lib/runtime'); // eslint-disable-line
const dao = require('../../dao/index')
const timeUtil = require('../../utils/time-util')

const PAGE_SIZE = 20

Component({
  properties: {
    commentThreadId: {
      type: String,
      value: ''
    }
  },
  data: {
    hotComments: [],
    comments: [],
    showLoading: false,
    offset: 0,
  },
  // 当前评论加载位置
  hasMore: true,
  lifetimes: {
    attached() {
      this.fetchComments()
    }
  },
  observers:{
    'commentThreadId' :function () {
      this.fetchComments()
    }
  },
  methods: {
    async fetchComments() {
      if(!this.data.commentThreadId) return
      try {
        console.log('')
        const response = await dao.getCommentList(this.data.commentThreadId, this.data.offset, PAGE_SIZE)
        const hotComments = response.hotComments && response.hotComments.map(comment => {
          return this.formatCommentTime(comment)
        })
        const newComments = response.comments.map(comment => {
          return this.formatCommentTime(comment)
        })
        const newData = {}
        if (hotComments) newData.hotComments = hotComments
        const comments = this.data.comments.concat(newComments)
        newData.comments = comments
        this.data.offset = comments.length
        this.hasMore = response.more
        this.setData(newData)
      } catch (e) {
        console.error(e)
        wx.showToast({
          icon: 'none',
          duration: 2000,
          title: '获取评论信息失败'
        })
      }
    },
    async onReachBottom() {
      if (!this.hasMore) return
      this.setData({
        showLoading: true
      })
      await this.fetchComments()
      this.setData({
        showLoading: false
      })
    },
    formatCommentTime(comment) {
      comment.time = timeUtil.formatCommentTime(comment.time)
      return comment
    }
  }
});
