const MATRIX_SIZE = 4

const MOVE_DIRECTION = {
  LEFT: 0,
  TOP: 1,
  RIGHT: 2,
  BOTTOM: 3
}

module.exports.MOVE_DIRECTION = MOVE_DIRECTION

function printMatrix(matrix) {
  for (let row of matrix) {
    console.log(row.join(' '))
  }
}

class Board {

  constructor() {
    this.matrix = []
    for (let i = 0; i < MATRIX_SIZE; i++) {
      const row = []
      for (let j = 0; j < MATRIX_SIZE; j++) {
        row.push(0)
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
      this.matrix[this.randomIndex()][this.randomIndex()] = Math.random() < 0.8 ? 2 : 4
    }
  }

  move(direction) {
    if (!this.canMove(direction)) {
      console.log('该方向不可用')
    }
    // 真实move逻辑
    // 还是只实现向左移的逻辑, 通过旋转数组,移动完再移回去就好
    /**
     * 1. 0和非0分开
     * 2. 相同数字合并
     * 3. 再次分开
     */

    const rotatedMatrix = this.transformMatrixToDirectionLeft(this.matrix, direction)
    // 按照向左移动
    const movedMatrix = []
    for (let i = 0; i < MATRIX_SIZE; i++) {
      const row = []
      for (let j = 0; j < MATRIX_SIZE; j++) {
        if (rotatedMatrix[i][j] !== 0) {
          row.push(rotatedMatrix[i][j])
        }
      }
      while (row.length < MATRIX_SIZE) {
        row.push(0)
      }
      movedMatrix.push(row)
    }
    printMatrix(movedMatrix)

    // 相同数字合并
    for (let i = 0; i < MATRIX_SIZE; i++) {
      for (let j = 0; j < MATRIX_SIZE - 1; j++) {
        if (movedMatrix[i][j] > 0 && movedMatrix[i][j] === movedMatrix[i][j + 1]) {
          movedMatrix[i][j] *= 2;
          // score += movedMatrix[i][j];
          movedMatrix[i][j + 1] = 0;
        }
      }
    }

    const againMovedMatrix = []
    for (let i = 0; i < MATRIX_SIZE; i++) {
      const row = []
      for (let j = 0; j < MATRIX_SIZE; j++) {
        if (movedMatrix[i][j] !== 0) {
          row.push(movedMatrix[i][j])
        }
      }
      while (row.length < MATRIX_SIZE) {
        row.push(0)
      }
      againMovedMatrix.push(row)
    }

    printMatrix(againMovedMatrix)
    this.matrix = this.reverseTransformMatrixToDirectionLeft(againMovedMatrix, direction)
  }

  // splitZero(matrix, direction) {
  //   const rotatedMatrix = this.transformMatrixToDirectionLeft(matrix, direction)
  //   // 按照向左移动
  //   const movedMatrix = []
  //   for (let i = 0; i < MATRIX_SIZE, i++) {
  //     const row = []
  //     for (let j = 0; j < MATRIX_SIZE; j++) {
  //       if (rotatedMatrix[i][j] !== 0) {
  //         row.push(rotatedMatrix[i][j])
  //       }
  //     }
  //     while (row.length < MATRIX_SIZE) {
  //       row.push(0)
  //     }
  //     movedMatrix.push(row)
  //   }
  //   // 按照
  // }

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

  reverseTransformMatrixToDirectionLeft(matrix, direction) {
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
    let matrix = JSON.parse(JSON.stringify(this.matrix))
    switch (direction) {
      case MOVE_DIRECTION.LEFT:
        break
      case MOVE_DIRECTION.TOP:
        matrix = this.rotateMultipleTimes(matrix, 3);
        break
      case MOVE_DIRECTION.RIGHT:
        matrix = this.rotateMultipleTimes(matrix, 2);
        break
      case MOVE_DIRECTION.BOTTOM:
        matrix = this.rotateMatrix(matrix);
        break
    }
    // 根据direction, 改为向左判断
    for (let i = 0; i < MATRIX_SIZE; i++) {
      for (let j = 0; j < MATRIX_SIZE; j++) {
        // 如果有两个连着相等的,可以滑动
        if (matrix[i][j] > 0 && matrix[i][j] === matrix[i][j + 1]) {
          return true;
        }
        // 如果有数字左边有0,可以滑动
        if (matrix[i][j] === 0 && matrix[i][j + 1] > 0) {
          return true;
        }
      }
    }
  }

  combine(direction) {

  }
}

module.exports.Board = Board
