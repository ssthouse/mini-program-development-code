//index.js
//获取应用实例
const app = getApp()
const exchangeRateMap = require('../../utils/exchange-rate')

Page({
  data: {
    motto: 'Hello World',
    exchangeList: [],
    moneyNum: 100,
    baseExchangeItem:{
      key: 'CNY',
      baseNum: 100,
      name: '人民币 ¥'
    }
  },
  onLoad () {
    // 初始化列表数据
    // delete exchangeRateMap.CNY
    const exchangeRateList = []
    for (let moneyKey of Object.keys(exchangeRateMap)) {
      exchangeRateList.push({
        key: moneyKey,
        ...exchangeRateMap[moneyKey]
      })
    }
    console.log(exchangeRateList)
    this.setData({
      'exchangeList': exchangeRateList
    })
  },
  onBaseNumChange (event) {
    // console.log(event.detail.value)
    // this.setData({
    //   moneyNum: event.detail.value
    // })
  },
  formatNum (num) {
    console.log(num)
    return num.toPrecision(2)
  }
})
