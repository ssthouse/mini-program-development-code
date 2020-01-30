const MATRIX_SIZE = 4

const MOVE_DIRECTION = {
  LEFT: 0,
  TOP: 1,
  RIGHT: 2,
  BOTTOM: 3
}

const COLOR_MAP = {
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

    // 用于保存移动状态,以便绘制动画
    this.isNew = false
    this.moveStep = 0
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

  constructor(context, canvasSize) {
    this.matrix = []
    this.currentScore = 0
    this.fillEmptyMatrix()
    this.context = context
    this.canvasSize = canvasSize
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
    }
  }

  moveValidNumToLeft(matrix) {
    const movedMatrix = []
    for (let i = 0; i < MATRIX_SIZE; i++) {
      const row = []
      for (let j = 0; j < MATRIX_SIZE; j++) {
        if (matrix[i][j].value !== 0) {
          matrix[i][j].moveStep = j - row.length
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

  drawBoard() {
    const context = this.context
    const canvasSize = this.canvasSize
    const matrix = this.matrix
    const PADDING = 8
    const CELL_SIZE = (canvasSize - (5 * PADDING)) / MATRIX_SIZE
    // console.log(this)
    context.clearRect(0, 0, canvasSize, canvasSize)
    for (let rowIndex = 0; rowIndex < MATRIX_SIZE; rowIndex++) {
      for (let colIndex = 0; colIndex < MATRIX_SIZE; colIndex++) {
        // 画出当前矩形
        const point1 = {
          x: PADDING + colIndex * (CELL_SIZE + PADDING),
          y: PADDING + rowIndex * (CELL_SIZE + PADDING)
        }
        this.drawCell(
          {
            point1,
            point2: {
              x: point1.x + CELL_SIZE,
              y: point1.y
            },
            point3: {
              x: point1.x + CELL_SIZE,
              y: point1.y + CELL_SIZE
            },
            point4: {
              x: point1.x,
              y: point1.y + CELL_SIZE
            }
          },
          matrix[rowIndex][colIndex].value
        )
      }
    }
  }

  drawCell(points, text) {
    if (text === 0) return
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
    context.fillStyle = COLOR_MAP[text].bgColor
    context.fill()
    context.fillStyle = COLOR_MAP[text].color
    context.font = '30px serif'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(
      text,
      (points.point1.x + points.point2.x) / 2,
      (points.point1.y + points.point4.y) / 2
    )
  }


  move(direction) {
    if (!this.canMove(direction)) {
      console.log('该方向不可用')
      return
    }
    const rotatedMatrix = this.transformMatrixToDirectionLeft(this.matrix, direction)
    const leftMovedMatrix = this.moveValidNumToLeft(rotatedMatrix)

    // TODO 尝试绘出中间动画
    this.matrix = this.reverseTransformMatrixFromDirectionLeft(leftMovedMatrix, direction)

    // 相同数字合并
    for (let i = 0; i < MATRIX_SIZE; i++) {
      for (let j = 0; j < MATRIX_SIZE - 1; j++) {
        if (leftMovedMatrix[i][j].value > 0
          && leftMovedMatrix[i][j].value === leftMovedMatrix[i][j + 1].value) {
          leftMovedMatrix[i][j].value *= 2;
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
      this.matrix[emptyPoint.rowIndex][emptyPoint.columnIndex] = Math.random() < 0.8 ?
        new Cell(2)
        : new Cell(4)
    }
    printMatrix(this.matrix)
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
        // console.log('i:j', i, j)
        // console.log('rotatedMatrix[i][j]', rotatedMatrix[i][j])
        // console.log('rotatedMatrix[i][j + 1]', rotatedMatrix[i][j + 1])
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
