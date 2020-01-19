//index.js
//获取应用实例
const app = getApp()

const MIN_OFFSET = 40;

const MOVE_DIRECTION = {
  LEFT: 0,
  TOP: 1,
  RIGHT: 2,
  BOTTOM: 3
}

Page({
  data: {
    motto: 'Hello World',
    // 棋盘
    matrix: [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ],
    highestScore: 0,
    currentScore: 0,
  },
  startGame() {
    console.log('start game')
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
      } else if (offsetY > MIN_OFFSET) {
        console.log('move bottom')
      }
    } else {
      if (offsetX < -MIN_OFFSET) {
        console.log('move left');
      } else if (offsetX > MIN_OFFSET) {
        console.log('move right');
      }
    }
  }
})
