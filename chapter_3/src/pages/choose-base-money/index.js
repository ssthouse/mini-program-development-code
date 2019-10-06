//index.js
//获取应用实例
const app = getApp()
const exchangeRateMap = require('../../utils/exchange-rate')
const settingUtil = require('../../utils/setting-util')

Page({
  data: {
    curMoneyKey: 'CNY',
    exchangeList: []
  },
  onLoad (options) {
    // 初始化列表数据
    const exchangeRateList = []
    for (let moneyKey of Object.keys(exchangeRateMap)) {
      exchangeRateList.push({
        key: moneyKey,
        ...exchangeRateMap[moneyKey]
      })
    }
    this.setData({
      'exchangeList': exchangeRateList,
      curMoneyKey: options['curMoneyKey']
    })
  },
  onChooseBaseMoney (event) {
    const baseMoneyKey = event.currentTarget.dataset['moneyKey']
    app.baseMoneyKey = baseMoneyKey
    // 保存setting
    settingUtil.saveBaseMoneyKey(baseMoneyKey)
    wx.navigateBack()
  }
})
