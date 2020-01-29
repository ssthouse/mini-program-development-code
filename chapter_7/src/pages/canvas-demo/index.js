const regeneratorRuntime = require('../../lib/runtime') // eslint-disable-line

const CANVAS_ID = 'canvas'

Page({
  data: {
    logs: []
  },
  onLoad: function () {
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
    context.draw()
  },
  onDrawRect() {
    const context = this.getCanvasContext()
    context.strokeRect(0, 0, 200, 200)
    context.draw()
  },
  onFillRect() {
    const context = this.getCanvasContext()
    context.fillRect(0, 0, 200, 200)
    context.draw()
  },
  onClearRect() {
    const context = this.getCanvasContext()
    context.clearRect(0, 0, 200, 200)
    context.draw()
  }
})
