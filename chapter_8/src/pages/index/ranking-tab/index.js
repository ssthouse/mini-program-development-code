const regeneratorRuntime = require('../../../lib/runtime'); // eslint-disable-line
const dao = require('../../../dao/index')

Component({
  data: {
    rankingList: [],
  },
  lifetimes: {
    attached() {
      this.fetchRankingList()
    }
  },
  methods: {
    async fetchRankingList() {
      try {
        const response = await dao.getRecommendProgram()
        const programList = response.programs
        this.setData({
          programList
        })
      } catch (e) {
        console.error(e)
        wx.showToast({
          icon: 'none',
          duration: 2000,
          title: '获取推荐节目失败'
        })
      }
    },
  },
})
