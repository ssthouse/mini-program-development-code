const regeneratorRuntime = require('../../lib/runtime') // eslint-disable-line

const CANVAS_ID = 'canvas'

Page({
  data: {
    logs: []
  },
  onLoad: async function () {
    this.canvas = await this.getCanvas()
    this.context = this.canvas.getContext('2d')
    this.canvasSize = await this.getCanvasSize()
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
  async onClearCanvas() {
    const canvasSize = await this.getCanvasSize()
    const context = this.getCanvasContext()
    context.clearRect(0, 0, canvasSize, canvasSize)
    context.draw(true)
  },
  onDrawRect() {
    const context = this.getCanvasContext()
    context.strokeRect(0, 0, 200, 200)
    context.draw(true)
  },
  onFillRect() {
    const context = this.getCanvasContext()
    context.fillRect(0, 0, 200, 200)
    context.draw(true)
  },
  onClearRect() {
    const context = this.getCanvasContext()
    context.clearRect(0, 0, 200, 200)
    context.draw(true)
  },
  onDrawTriangle() {
    const context = this.getCanvasContext()
    context.beginPath()
    context.moveTo(100, 100)
    context.lineTo(160, 200);
    context.lineTo(220, 100);
    context.closePath()
    context.stroke()
    context.draw(true)
  },
  onDrawArc() {
    const context = this.getCanvasContext();
    context.arc(100, 100, 50, 0, Math.PI);
    context.stroke()
    context.draw(true)
  },
  onDrawRoundedRect() {
    const context = this.getCanvasContext();
    const points = {
      point1: {x: 100, y: 100},
      point2: {x: 200, y: 100},
      point3: {x: 200, y: 200},
      point4: {x: 100, y: 200}
    }
    context.beginPath();
    context.moveTo((points.point1.x + points.point2.x) / 2,
      (points.point1.y + points.point2.y) / 2)
    context.arcTo(points.point2.x, points.point2.y,
      points.point3.x, points.point3.y, 12)
    context.arcTo(points.point3.x, points.point3.y,
      points.point4.x, points.point4.y, 12)
    context.arcTo(points.point4.x, points.point4.y,
      points.point1.x, points.point1.y, 12)
    context.arcTo(points.point1.x, points.point1.y,
      points.point2.x, points.point2.y, 12)
    context.closePath()
    context.stroke()
    context.draw(true)
  },
  async onDrawSimpleAnimation() {
    const rectSize = 50
    const leftTopPoint = {
      x: 100,
      y: 100
    }
    const requestAnimationFrame = this.canvas.requestAnimationFrame
    console.log('requestAnimationFrame', requestAnimationFrame)
    const drawRect = () => {
      console.log('canvas size', this.canvasSize)
      this.context.clearRect(0, 0, 1000, 1000)
      this.context.fillRect(leftTopPoint.x, leftTopPoint.y, rectSize, rectSize)
      console.log('repeat?',  leftTopPoint.x < 200)
      if (leftTopPoint.x < 200) {
        leftTopPoint.x += 1;
        console.log(leftTopPoint.x)
        requestAnimationFrame(drawRect)
      }
    }
    drawRect()
  }
})
