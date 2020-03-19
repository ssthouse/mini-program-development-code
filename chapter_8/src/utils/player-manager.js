const listenerMap = {
  onPause: [],
  onPlay: [],
  onTimeUpdate: [],
}

const EVENT_TYPE = {
  ON_PAUSE: 'onPause',
  ON_PLAY: 'onPlay',
  ON_TIME_UPDATE: 'onTimeUpdate'
}

function init() {
  const audioManager = wx.getBackgroundAudioManager()
  // 注册监听事件
  audioManager.onTimeUpdate((error) => {
    if (error) return
    listenerMap[EVENT_TYPE.ON_TIME_UPDATE].forEach(callback => {
      callback && callback()
    })
  })
  audioManager.onPlay(() => {
    listenerMap[EVENT_TYPE.ON_PLAY].forEach(callback => {
      callback && callback()
    })
  })
  audioManager.onPause(() => {
    listenerMap[EVENT_TYPE.ON_PAUSE].forEach(callback => {
      callback && callback()
    })
  })
}

function registerEvent(eventName, callback) {
  if (Object.values(EVENT_TYPE).indexOf(eventName) === -1) return // 检查事件名合法性
  if (!callback) return
  listenerMap[eventName].push(callback)
}

function unregisterEvent(eventName, callback) {
  if (Object.values(EVENT_TYPE).indexOf(eventName) === -1) return // 检查事件名合法性
  if (!callback) return
  if (listenerMap[eventName].indexOf(callback) === -1) return
  listenerMap[eventName].splice(listenerMap[eventName].indexOf(callback), 1)
}

function playMusic(musicUrl) {
  const audioManager = wx.getBackgroundAudioManager()
  audioManager.src = musicUrl
  audioManager.title = '云音乐'
  audioManager.play()
}

function pause() {
  const audioManager = wx.getBackgroundAudioManager()
  audioManager.pause()
}

function seekMusic(seekTime) {
  if (seekTime < 0) return
  const audioManager = wx.getBackgroundAudioManager()
  audioManager.seek(seekTime)
}


init()

module.exports = {
  EVENT_TYPE,
  registerEvent,
  unregisterEvent,
  playMusic,
  pause,
  seekMusic
}
