const regeneratorRuntime = require('../lib/runtime'); // eslint-disable-line

const BASE_URL = `http://localhost:3000/v1/`

async function getRecommendPlaylists() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + 'personalized',
      data: {cookie: ''},
      success: function (res) {
        resolve(res.data.result)
      }
    })
  })
}

//  'personalized/newsong', 'personalized/mv', 'personalized/djprogram'

async function getRecommendNewSong() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + 'personalized/newsong',
      data: {cookie: ''},
      success: function (res) {
        resolve(res.data.result)
      }
    })
  })
}

async function getRecommendMV() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + 'personalized/mv',
      data: {cookie: ''},
      success: function (res) {
        resolve(res.data.result)
      }
    })
  })
}

async function getRecommendDJ() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + 'personalized/djprogram',
      data: {cookie: ''},
      success: function (res) {
        resolve(res.data.result)
      }
    })
  })
}

module.exports = {
  getRecommendPlaylists,
  getRecommendNewSong,
  getRecommendMV,
  getRecommendDJ
}
