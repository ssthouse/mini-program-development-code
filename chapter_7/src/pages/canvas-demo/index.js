const regeneratorRuntime = require('../../lib/runtime') // eslint-disable-line

const CANVAS_ID = 'canvas'

Page({
  data: {
    logs: []
  },
  onLoad: function () {
  },
  getCanvasContext() {
    return wx.createCanvasContext(CANVAS_ID, this);
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
  onDrawReact() {
    const context = this.getCanvasContext()
    context.setStrokeStyle("#000000")
    context.setLineWidth(1)
    context.rect(0, 0, 200, 200)
    context.stroke()
    context.draw()
  }
})
