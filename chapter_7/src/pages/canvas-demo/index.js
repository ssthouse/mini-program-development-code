const regeneratorRuntime = require('../../lib/runtime') // eslint-disable-line

const CANVAS_ID = 'canvas'

Page({
  data: {
    logs: []
  },
  context: null,
  onLoad: function () {
    this.context = wx.createCanvasContext(CANVAS_ID);
  },
  getCanvasContext() {
    return wx.createCanvasContext(CANVAS_ID);
  },
  /**
   * 获取画布大小
   * @return {Promise<number>}
   */
  async getCanvasSize() {
    return new Promise((resolve, reject) => {
      wx.createSelectorQuery().select('.canvas')
        .boundingClientRect(function (rect) {
          resolve(rect['width'])
        }).exec()
    })
  },
  async onClearCanvas() {
    const canvasSize = await this.getCanvasSize()
    const context = this.getCanvasContext()
    context.clearRect(0, 0, canvasSize, canvasSize)
    context.draw(true)
  },
  onDrawRect() {
    const context = this.context
    context.strokeRect(0, 0, 200, 200)
    context.draw(true)
  },
  onFillRect() {
    const context = this.context
    context.fillRect(0, 0, 200, 200)
    context.draw(true)
  },
  onClearRect() {
    const context = this.context
    context.clearRect(0, 0, 200, 200)
    context.draw(true)
  },
  onDrawTriangle() {
    const context = this.context
    context.beginPath()
    context.moveTo(100, 100)
    context.lineTo(160, 200);
    context.lineTo(220, 100);
    context.closePath()
    context.stroke()
    context.draw(true)
  }
})
