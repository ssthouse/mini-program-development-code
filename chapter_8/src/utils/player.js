function playMusic(musicUrl) {
  const audioManager = wx.getBackgroundAudioManager()
  audioManager.src = musicUrl
  audioManager.title = '111'
  audioManager.play()
}

function pause() {
  const audioManager = wx.getBackgroundAudioManager()
  audioManager.pause()
}

module.exports = {
  playMusic,
  pause
}
