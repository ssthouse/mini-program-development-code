const dataReporter = require('../../utils/data-reporter')

Page({
  data: {},
  onLoad: function (options) {
    dataReporter.reportOpenPage('index-page')
  },
  onClickBtn() {
    dataReporter.reportClickBtn('index-btn')
  }
})
