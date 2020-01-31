const regeneratorRuntime = require('../../lib/runtime') // eslint-disable-line

const MATRIX_SIZE = 4
const PADDING = 8

const MOVE_DIRECTION = {
  LEFT: 0,
  TOP: 1,
  RIGHT: 2,
  BOTTOM: 3
}

const COLOR_MAP = {
  0: {color: '#776e65', bgColor: '#EEE4DA40'},
  2: {color: '#776e65', bgColor: '#eee4da'},
  4: {color: '#776e65', bgColor: '#ede0c8'},
  8: {color: '#f9f6f2', bgColor: '#f2b179'},
  16: {color: '#f9f6f2', bgColor: '#f59563'},
  32: {color: '#f9f6f2', bgColor: '#f67c5f'},
  64: {color: '#f9f6f2', bgColor: '#f65e3b'},
  128: {color: '#f9f6f2', bgColor: '#edcf72'},
  256: {color: '#f9f6f2', bgColor: '#edcc61'},
  512: {color: '#f9f6f2', bgColor: '#edc850'},
  1024: {color: '#f9f6f2', bgColor: '#edc53f'},
  2048: {color: '#f9f6f2', bgColor: '#edc22e'}
}

class Point {
  constructor(rowIndex, columnIndex) {
    this.rowIndex = rowIndex
    this.columnIndex = columnIndex
  }

}

class Cell {
  constructor(value) {
    this.value = value
    // 是否新建方块
    this.isNew = false
    // 移动距离
    this.moveStep = 0
  }

  newStatus(newStatus) {
    if (newStatus !== undefined) {
      this.isNew = newStatus
      return this
    }
    return this.isNew
  }
}

module.exports.MOVE_DIRECTION = MOVE_DIRECTION

function printMatrix(matrix) {
  for (let row of matrix) {
    const values = row.map(cell => cell.value)
    console.log(values.join(' '))
  }
}

class Board {

  constructor(canvas, context, canvasSize) {
    this.matrix = []
    this.currentScore = 0
    this.fillEmptyMatrix()
    this.canvas = canvas
    this.context = context
    this.canvasSize = canvasSize
    this.CELL_SIZE = (canvasSize - (5 * PADDING)) / MATRIX_SIZE
  }

  fillEmptyMatrix() {
    for (let i = 0; i < MATRIX_SIZE; i++) {
      const row = []
      for (let j = 0; j < MATRIX_SIZE; j++) {
        row.push(new Cell(0))
      }
      this.matrix.push(row)
    }
  }

  randomIndex() {
    return Math.floor(Math.random() * MATRIX_SIZE)
  }

  startGame() {
    // 初始化两个cell
    for (let i = 0; i < 2; i++) {
      this.matrix[this.randomIndex()][this.randomIndex()].value = Math.random() < 0.8 ? 2 : 4
      this.matrix[this.randomIndex()][this.randomIndex()].newStatus(true)
      this.drawWithAnimation(-1)
    }
  }

  moveValidNumToLeft(matrix) {
    const movedMatrix = []
    for (let i = 0; i < MATRIX_SIZE; i++) {
      const row = []
      for (let j = 0; j < MATRIX_SIZE; j++) {
        if (matrix[i][j].value !== 0) {
          matrix[i][j].moveStep += j - row.length
          row.push(matrix[i][j])
        }
      }
      while (row.length < MATRIX_SIZE) {
        row.push(new Cell(0))
      }
      movedMatrix.push(row)
    }
    return movedMatrix
  }

  drawBoard(process = 1, direction) {
    const context = this.context
    const canvasSize = this.canvasSize
    const matrix = this.matrix
    const CELL_SIZE = this.CELL_SIZE
    context.clearRect(0, 0, canvasSize, canvasSize)
    this.drawBgCells()
    for (let rowIndex = 0; rowIndex < MATRIX_SIZE; rowIndex++) {
      for (let colIndex = 0; colIndex < MATRIX_SIZE; colIndex++) {
        // 画出当前矩形
        const moveStep = matrix[rowIndex][colIndex].moveStep
        const startPoint = {
          x: (PADDING + colIndex * (CELL_SIZE + PADDING)),
          y: PADDING + rowIndex * (CELL_SIZE + PADDING)
        }
        switch (direction) {
          case MOVE_DIRECTION.LEFT:
            startPoint.x += moveStep * (CELL_SIZE + PADDING) * (1 - process)
            break
          case MOVE_DIRECTION.RIGHT:
            startPoint.x -= moveStep * (CELL_SIZE + PADDING) * (1 - process)
            break
          case MOVE_DIRECTION.TOP:
            startPoint.y += moveStep * (CELL_SIZE + PADDING) * (1 - process)
            break
          case MOVE_DIRECTION.BOTTOM:
            startPoint.y -= moveStep * (CELL_SIZE + PADDING) * (1 - process)
            break
        }
        this.drawCell(
          startPoint.x,
          startPoint.y,
          CELL_SIZE,
          matrix[rowIndex][colIndex],
          process
        )
      }
    }
  }

  drawBgCells() {
    const context = this.context
    context.globalAlpha = 1
    for (let rowIndex = 0; rowIndex < MATRIX_SIZE; rowIndex++) {
      for (let colIndex = 0; colIndex < MATRIX_SIZE; colIndex++) {
        context.fillStyle = 'rgba(238, 228, 218, 0.35)'
        this.drawRoundSquare(
          PADDING + colIndex * (this.CELL_SIZE + PADDING),
          PADDING + rowIndex * (this.CELL_SIZE + PADDING),
          this.CELL_SIZE
        )
        context.fill()
      }
    }
  }

  drawCell(x, y, size, cell, process) {
    const text = cell.value
    if (text === 0) return
    const context = this.context
    context.globalAlpha = cell.isNew ? process * process : 1
    context.fillStyle = COLOR_MAP[text].bgColor
    this.drawRoundSquare(x, y, size)
    context.fill()
    context.fillStyle = COLOR_MAP[text].color
    context.font = '40px Clear Sans'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(
      text,
      x + size / 2,
      y + size / 2
    )
  }

  drawRoundSquare(startX, startY, size) {
    const point1 = {
      x: startX,
      y: startY
    }
    const points = {
      point1,
      point2: {
        x: point1.x + size,
        y: point1.y
      },
      point3: {
        x: point1.x + size,
        y: point1.y + size
      },
      point4: {
        x: point1.x,
        y: point1.y + size
      }
    }
    const context = this.context
    context.beginPath()
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
  }

  async drawWithAnimation(direction) {
    return new Promise(resolve => {
      let process = 0
      const draw = () => {
        this.drawBoard(process / 100, direction)
        if (process < 100) {
          process += 10
          this.canvas.requestAnimationFrame(draw)
        } else {
          // 将cell数据复位
          for (let row of this.matrix) {
            for (let cell of row) {
              cell.newStatus(false)
              cell.moveStep = 0
            }
          }
          resolve()
        }
      }
      draw()
    })
  }

  async move(direction) {
    if (!this.canMove(direction)) {
      console.log('该方向不可用')
      return
    }
    const rotatedMatrix = this.transformMatrixToDirectionLeft(this.matrix, direction)
    const leftMovedMatrix = this.moveValidNumToLeft(rotatedMatrix)
    this.matrix = this.reverseTransformMatrixFromDirectionLeft(leftMovedMatrix, direction)
    // 相同数字合并
    for (let i = 0; i < MATRIX_SIZE; i++) {
      for (let j = 0; j < MATRIX_SIZE - 1; j++) {
        if (leftMovedMatrix[i][j].value > 0
          && leftMovedMatrix[i][j].value === leftMovedMatrix[i][j + 1].value) {
          leftMovedMatrix[i][j].value *= 2;
          leftMovedMatrix[i][j].newStatus(true)
          this.currentScore += leftMovedMatrix[i][j].value;
          leftMovedMatrix[i][j + 1].value = 0;
        }
      }
    }
    const againMovedMatrix = this.moveValidNumToLeft(leftMovedMatrix)
    this.matrix = this.reverseTransformMatrixFromDirectionLeft(againMovedMatrix, direction)
    // 增加一个新数字
    const emptyPoints = this.getEmptyCells();
    if (emptyPoints.length !== 0) {
      const emptyPoint = emptyPoints[Math.floor(Math.random() * emptyPoints.length)]
      const cell = Math.random() < 0.8 ?
        new Cell(2)
        : new Cell(4)
      cell.newStatus(true)
      this.matrix[emptyPoint.rowIndex][emptyPoint.columnIndex] = cell
    }
    await this.drawWithAnimation(direction)
  }

  transformMatrixToDirectionLeft(matrix, direction) {
    switch (direction) {
      case MOVE_DIRECTION.LEFT:
        return matrix
      case MOVE_DIRECTION.TOP:
        return this.rotateMultipleTimes(matrix, 3);
      case MOVE_DIRECTION.RIGHT:
        return this.rotateMultipleTimes(matrix, 2);
      case MOVE_DIRECTION.BOTTOM:
        return this.rotateMatrix(matrix);
      default:
        return matrix
    }
  }

  reverseTransformMatrixFromDirectionLeft(matrix, direction) {
    switch (direction) {
      case MOVE_DIRECTION.LEFT:
        return matrix
      case MOVE_DIRECTION.TOP:
        return this.rotateMultipleTimes(matrix, 1);
      case MOVE_DIRECTION.RIGHT:
        return this.rotateMultipleTimes(matrix, 2);
      case MOVE_DIRECTION.BOTTOM:
        return this.rotateMultipleTimes(matrix, 3);
      default:
        return matrix
    }
  }

  rotateMultipleTimes(matrix, rotateNum) {
    let newMatrix = matrix
    while (rotateNum > 0) {
      newMatrix = this.rotateMatrix(newMatrix)
      rotateNum--
    }
    return newMatrix
  }

  // 顺时针旋转90°
  rotateMatrix(matrix) {
    const rotatedMatrix = []
    for (let i = 0; i < MATRIX_SIZE; i++) {
      const row = []
      for (let j = MATRIX_SIZE - 1; j >= 0; j--) {
        row.push(matrix[j][i])
      }
      rotatedMatrix.push(row)
    }
    return rotatedMatrix
  }

  canMove(direction) {
    const rotatedMatrix = this.transformMatrixToDirectionLeft(this.matrix, direction)
    // 根据direction, 改为向左判断
    for (let i = 0; i < MATRIX_SIZE; i++) {
      for (let j = 0; j < MATRIX_SIZE - 1; j++) {
        // 如果有两个连着相等的,可以滑动
        if (rotatedMatrix[i][j].value > 0
          && rotatedMatrix[i][j].value === rotatedMatrix[i][j + 1].value) {
          return true;
        }
        // 如果有数字左边有0,可以滑动
        if (rotatedMatrix[i][j].value === 0 && rotatedMatrix[i][j + 1].value > 0) {
          return true;
        }
      }
    }
    return false
  }

  isGameOver() {
    return !this.canMove(MOVE_DIRECTION.LEFT) &&
      !this.canMove(MOVE_DIRECTION.TOP) &&
      !this.canMove(MOVE_DIRECTION.RIGHT) &&
      !this.canMove(MOVE_DIRECTION.BOTTOM)
  }

  getEmptyCells() {
    const emptyCells = []
    for (let i = 0; i < MATRIX_SIZE; i++) {
      for (let j = 0; j < MATRIX_SIZE; j++) {
        if (this.matrix[i][j].value === 0) {
          emptyCells.push(new Point(i, j))
        }
      }
    }
    return emptyCells
  }

  isWinning() {
    let max = 0
    const winNum = 2048
    for (let row of this.matrix) {
      for (let cell of row) {
        max = Math.max(cell, max)
      }
      if (max > winNum) {
        return false
      }
    }
    return max === winNum
  }
}

module.exports.Board = Board
