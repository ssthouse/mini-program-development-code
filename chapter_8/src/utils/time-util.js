const ONE_MINUTE = 60 * 1000
const ONE_HOUR = 60 * ONE_MINUTE
const ONE_DAY = 24 * ONE_HOUR

function isYesterday(targetTime) {
  const currentTime = Date.now()
  const today = new Date(currentTime - currentTime % ONE_DAY)
  return today - (targetTime - targetTime % ONE_DAY) === ONE_DAY
}

function isToday(targetTime) {
  const now = Date.now()
  return targetTime - targetTime % ONE_DAY === now - now % ONE_DAY
}

function formatCommentTime(timestamp) {
  const date = new Date(timestamp)
  // 今天
  if (isToday(timestamp)) {
    if (Date.now() - date.getTime() < ONE_HOUR) {
      return `${Math.floor((Date.now() - date.getTime()) / ONE_MINUTE)}分钟前`
    }
    return `${date.getHours()}:${date.getMinutes()}`
  }
  // 昨天
  if (isYesterday(timestamp)) {
    return `昨天${date.getHours()}:${date.getMinutes()}`
  }
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

module.exports = {
  formatCommentTime
}
