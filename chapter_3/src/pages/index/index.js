//index.js
//获取应用实例
const app = getApp()
const exchangeRateMap = require('../../utils/exchange-rate')

Page({
  data: {
    exchangeList: [],
    moneyNum: 100,
    baseExchangeItem: {
      key: 'CNY',
      baseNum: 100,
      name: '人民币 ¥'
    }
  },
  onShow () {
    if(app.baseMoneyKey === this.data.baseExchangeItem.key){
      return
    }
    const baseExchangeItem = this.data.exchangeList.find(item => {
      if (item.key === app.baseMoneyKey) return true
    })
    this.setData({
      'baseExchangeItem': baseExchangeItem
    })
  },
  onLoad () {
    // 初始化列表数据
    const exchangeRateList = []
    for (let moneyKey of Object.keys(exchangeRateMap)) {
      exchangeRateList.push({
        key: moneyKey,
        ...exchangeRateMap[moneyKey]
      })
    }
    this.setData({
      'exchangeList': exchangeRateList
    })
  },
  onBaseNumChange (event) {
    this.setData({
      moneyNum: event.detail.value
    })
  },
  onClickSwitchBaseMoney () {
    wx.navigateTo({
      url: `/pages/choose-base-money/index?curMoneyKey=${this.data.baseExchangeItem.key}`
    })
  }
})
