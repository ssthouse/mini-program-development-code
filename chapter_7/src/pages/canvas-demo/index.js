
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.drawReact()
  },
  drawReact() {
    const context = wx.createCanvasContext('canvas');
    context.setStrokeStyle("#000000")
    context.setLineWidth(1)
    context.rect(0, 0, 200, 200)
    context.stroke()
    context.draw()
  }
})
