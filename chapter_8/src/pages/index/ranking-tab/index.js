const regeneratorRuntime = require('../../../lib/runtime'); // eslint-disable-line
const dao = require('../../../dao/index')

Component({
  data: {
    rankingList: [],
    netmusicList: []
  },
  lifetimes: {
    attached() {
      this.fetchRankingList()
    }
  },
  methods: {
    async fetchRankingList() {
      try {
        const response = await dao.getRankingList()
        const list = response.list
        const rankingList = []
        const netmusicList = []
        for (let i = 0; i < list.length; i++) {
          if (list[i].ToplistType) {
            netmusicList.push(list[i])
          } else {
            rankingList.push(list[i])
          }
        }
        this.setData({
          rankingList,
          netmusicList,
        })
      } catch (e) {
        console.error(e)
        wx.showToast({
          icon: 'none',
          duration: 2000,
          title: '获取排行榜数据失败'
        })
      }
    },
  },
})
