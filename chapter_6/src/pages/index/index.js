//index.js
//获取应用实例
const app = getApp()
const board = require('./board')
const gameManager = require('./game-manager')
const MOVE_DIRECTION = board.MOVE_DIRECTION

const MIN_OFFSET = 40;

Page({
  data: {
    motto: 'Hello World',
    // 棋盘
    matrix: [[]],
    highestScore: 0,
    currentScore: 0,
  },
  board: new board.Board(),
  onLoad() {
    this.startGame()
  },
  startGame() {
    this.board = new board.Board()
    this.board.startGame()
    this.setData({
      matrix: this.board.matrix,
      currentScore: 0,
      highestScore: gameManager.getHighestScore()
    })
  },
  onStartNewGame() {
    this.startGame()
  },
  // 用于判断滑动方向的属性值
  touchStartX: 0,
  touchStartY: 0,
  touchEndX: 0,
  touchEndY: 0,
  onTouchStart(e) {
    const touch = e.touches[0]
    this.touchStartX = touch.clientX
    this.touchStartY = touch.clientY
  },
  onTouchMove(e) {
    const touch = e.touches[0]
    this.touchEndX = touch.clientX
    this.touchEndY = touch.clientY
  },
  onTouchEnd(e) {
    const offsetX = this.touchEndX - this.touchStartX
    const offsetY = this.touchEndY - this.touchStartY
    const moveVertical = Math.abs(offsetY) > Math.abs(offsetX)
    if (moveVertical) {
      if (offsetY < -MIN_OFFSET) {
        console.log('move top')
        this.board.move(MOVE_DIRECTION.TOP)
      } else if (offsetY > MIN_OFFSET) {
        console.log('move bottom')
        this.board.move(MOVE_DIRECTION.BOTTOM)
      }
    } else {
      if (offsetX < -MIN_OFFSET) {
        console.log('move left');
        this.board.move(MOVE_DIRECTION.LEFT)
      } else if (offsetX > MIN_OFFSET) {
        console.log('move right');
        this.board.move(MOVE_DIRECTION.RIGHT)
      }
    }
    this.setData({
      matrix: this.board.matrix,
      currentScore: this.board.currentScore
    });
    console.log('current score', this.board.currentScore)
    if (this.board.isGameOver()) {
      wx.showModal({
        title: '游戏结束',
        content: '再玩一次',
        showCancel: false,
        success (res) {
          const highestScore = gameManager.getHighestScore()
          if (this.data.currentScore > highestScore) {
            gameManager.setHighestScore(this.data.currentScore)
          }
          this.startGame()
        }
      })
    }
    // TODO: 判断是否2048
    if (this.board.isWinning()) {
      // 显示祝福语,可以继续玩
      wx.showToast({
        title: '达成2048成就',
        icon: 'success'
      })
    }
  }
})
