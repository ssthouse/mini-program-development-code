//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    // 棋盘
    matrix: [
      [1,2,3,4],
      [1,2,3,4],
      [1,2,3,4],
      [1,2,3,4],
    ],
    highestScore: 0,
    currentScore: 0,
  },
  startGame() {
    console.log('start game')
  }
})
