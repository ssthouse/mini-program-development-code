const regeneratorRuntime = require('../../lib/runtime') // eslint-disable-line

//获取应用实例
const app = getApp()
const board = require('./board')
const gameManager = require('./game-manager')
const MOVE_DIRECTION = board.MOVE_DIRECTION

const MIN_OFFSET = 40;
const MATRIX_SIZE = 4


Page({
  data: {
    motto: 'Hello World',
    // 棋盘
    matrix: [[]],
    highestScore: 0,
    currentScore: 0,
  },
  board: new board.Board(),
  async onLoad() {
    await this.initCanvas()
    this.startGame()
  },
  startGame() {
    this.board = new board.Board(this.context, this.canvasSize)
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
  canvasSize: null,
  canvas: null,
  context: null,
  colorMap: {
    0: {color: '#776e65', bgColor: '#EEE4DA40'},
    2: {color: '#776e65', bgColor: '#eee4da'},
    4: {color: '#776e65', bgColor: '#eee4da'},
    8: {color: '#f9f6f2', bgColor: '#f2b179'},
    16: {color: '#f9f6f2', bgColor: '#f59563'},
    32: {color: '#f9f6f2', bgColor: '#f67c5f'},
    64: {color: '#f9f6f2', bgColor: '#f65e3b'},
    128: {color: '#f9f6f2', bgColor: '#edcf72'},
    256: {color: '#f9f6f2', bgColor: '#edcc61'},
    512: {color: '#f9f6f2', bgColor: '#edc850'},
    1024: {color: '#f9f6f2', bgColor: '#edc53f'},
    2048: {color: '#f9f6f2', bgColor: '#edc22e'}
  },
  async initCanvas() {
    this.canvas = await this.getCanvas()
    this.canvasSize = await this.getCanvasSize()
    this.context = this.canvas.getContext('2d')
  },
  async getCanvasSize() {
    return new Promise((resolve, reject) => {
      wx.createSelectorQuery().select('#canvas')
        .boundingClientRect(function (rect) {
          resolve(rect['width'])
        }).exec()
    })
  },
  async getCanvas() {
    return new Promise(resolve => {
      wx.createSelectorQuery()
        .select('#canvas')
        .fields({
          node: true,
          size: true,
        })
        .exec((res) => {
          console.log('res', res[0])
          const canvas = res[0].node
          resolve(canvas)
        })
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
      matrix: this.board.matrix,
      currentScore: this.board.currentScore
    });
    this.board.drawBoard()
    if (this.board.isGameOver()) {
      const highestScore = gameManager.getHighestScore()
      if (this.data.currentScore > highestScore) {
        gameManager.setHighestScore(this.data.currentScore)
      }
      wx.showModal({
        title: '游戏结束',
        content: '再玩一次',
        showCancel: false,
        success: () => {
          this.startGame()
        }
      })
    }
    if (this.board.isWinning()) {
      // 显示祝福语,可以继续玩
      wx.showToast({
        title: '达成2048成就',
        icon: 'success'
      })
    }
  }
})
