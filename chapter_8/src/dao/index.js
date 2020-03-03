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

// 获取歌曲详情(用于播放页面)
async function getSongDetail(songId) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + 'music/detail',
      data: {id: songId},
      success: function (res) {
        resolve(res.data.songs[0])
      }
    })
  })
}

// 获取歌曲播放url
async function getMusicUrl(songId, br) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + 'music/url',
      data: {
        id: songId,
        br,
      },
      success: function (res) {
        resolve(res.data.data[0].url)
      }
    })
  })
}

// 获取歌词
async function getLyric(songId) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + 'lyric',
      data: {
        id: songId
      },
      success: function (res) {
        resolve(res.data)
      }
    })
  })
}

// 获取歌单详情
async function getPlaylistDetail(playlistId) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + 'playlist/detail',
      data: {
        id: playlistId,
        limit: 1000,
      },
      success: function (res) {
        resolve(res.data)
      }
    })
  })
}

// 获取评论列表
async function getCommentList(commentThreadId, offset = 0, limit = 20) {
  return new Promise((resolve) => {
    wx.request({
      url: BASE_URL + 'comments',
      data: {
        id: commentThreadId,
        offset,
        limit
      },
      success: function (res) {
        resolve(res.data)
      }
    })
  })
}

// 获取用户profile
async function getUserProfile(uid) {
  return new Promise((resolve) => {
    wx.request({
      url: BASE_URL + 'user/detail',
      data: {
        uid
      },
      success: function (res) {
        resolve(res.data)
      }
    })
  })
}

// 获取用户歌单
async function getUserPlaylist(uid, offset, limit) {
  return new Promise((resolve => {
    wx.request({
      url: BASE_URL + 'user/playlist',
      data: {
        uid,
        offset,
        limit
      },
      success(res) {
        resolve(res.data)
      }
    })
  }))
}

// 获取MV详情
async function getMvDetail(id) {
  return new Promise((resolve => {
    wx.request({
      url: BASE_URL + 'mv',
      data: {
        id
      },
      success(res) {
        resolve(res.data.data)
      }
    })
  }))
}

// 获取相关MV
async function getSimilarMV(mvId) {
  return new Promise((resolve => {
    wx.request({
      url: BASE_URL + 'mv/simi',
      data: {
        id: mvId
      },
      success(res) {
        resolve(res.data.mvs)
      }
    })
  }))
}

// 根据歌单类别获取歌单列表
async function getPlaylistByCategory(category, offset, limit) {
  return new Promise((resolve => {
    wx.request({
      url: BASE_URL + 'top/playlist',
      data: {
        type: category,
        offset,
        limit
      },
      success(res) {
        resolve(res.data)
      }
    })
  }))
}

// 获取歌单分类信息
async function getPlaylistCategory() {
  return new Promise((resolve => {
    wx.request({
      url: BASE_URL + 'playlist/catlist',
      data: {},
      success(res) {
        resolve(res.data)
      }
    })
  }))
}

module.exports = {
  getRecommendPlaylists,
  getRecommendNewSong,
  getRecommendMV,
  getRecommendDJ,
  getSongDetail,
  getMusicUrl,
  getLyric,
  getPlaylistDetail,
  getCommentList,
  getUserProfile,
  getUserPlaylist,
  getMvDetail,
  getSimilarMV,
  getPlaylistByCategory,
  getPlaylistCategory
}
