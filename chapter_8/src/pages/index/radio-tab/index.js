const regeneratorRuntime = require('../../../lib/runtime'); // eslint-disable-line
const dao = require('../../../dao/index')

const LIMIT = 20

Component({
  data: {
    hasMore: true,
    radioList: [],
    hotRadioList: [],
    programList: [],
    showLoading: false,
    offset: 0,
  },
  lifetimes: {
    attached() {
      this.fetchRecommendPrograms()
      this.fetchRecommendRadios()
      this.fetchHotRadios()
    }
  },
  methods: {
    onReachBottom() {
      this.fetchHotRadios()
    },
    async fetchRecommendPrograms() {
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
    async fetchRecommendRadios() {
      try {
        const response = await dao.getRecommendRadio()
        this.setData({
          radioList: response.djRadios.slice(0, 6)
        })
      } catch (e) {
        console.error(e)
        wx.showToast({
          icon: 'none',
          duration: 2000,
          title: '获取歌单信息失败'
        })
      }
    },
    async fetchHotRadios() {
      this.setData({
        showLoading: true
      })
      try {
        const response = await dao.getHotRadio(this.data.offset, LIMIT)
        const newRadios = response.djRadios
        const newData = {
          hasMore: response['hasMore'],
        }
        if (newRadios) {
          newData.hotRadioList = this.data.hotRadioList.concat(newRadios)
          this.data.offset = newData.hotRadioList.length
        }
        this.setData(newData)
      } catch (e) {
        console.error(e)
        wx.showToast({
          icon: 'none',
          duration: 2000,
          title: '获取热门电台信息失败'
        })
      }
      this.setData({
        showLoading: false
      })
    },
    onClickProgram(e){
      const program = e.currentTarget.dataset['program']
      getApp().globalData.selectedRadio = program.radio
      getApp().globalData.selectedProgram = program
      wx.navigateTo({
        url: `/pages/radio/play/index?programId=${program.id}`
      })
    }
  },
})
