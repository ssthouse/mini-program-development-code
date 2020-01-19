//index.js
//获取应用实例
const app = getApp()
const board = require('./board')
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
    this.board.startGame()
    this.setData({
      matrix: this.board.matrix
    })
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
      matrix: this.board.matrix
    })
    // TODO: 移动后, 判断是否游戏结束
  }
})
