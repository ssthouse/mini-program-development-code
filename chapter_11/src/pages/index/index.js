const dataReporter = require('../../utils/data-reporter')

Page({
  data: {},
  onLoad: function (options) {
    dataReporter.reportOpenPage('index-page')
  },
  onClickBtn() {
    // dataReporter.reportClickBtn('index-btn')
    wx.reportAnalytics('demo_event', // 事件名
      {
        'field_one': 'field_one_value',
        'field_two': 'field_two_value'
      })
  }
})
