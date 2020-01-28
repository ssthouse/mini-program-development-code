const HIGHEST_SCORE_KEY = 'highest_score'
const DEFAULT_HIGHEST_SCORE = 0

function setHighestScore(score) {
  if (score <= 0) throw new Error("score is invalid")
  wx.setStorageSync(HIGHEST_SCORE_KEY, score)
}

function getHighestScore() {
  return wx.getStorageSync(HIGHEST_SCORE_KEY) | DEFAULT_HIGHEST_SCORE
}


module.exports = {
  setHighestScore,
  getHighestScore
}
