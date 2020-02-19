const board = require('./board')

const testBoard = new board.Board()
const originMatrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
]

const targetMatrix = [
  [13, 9, 5, 1],
  [14, 10, 6, 2],
  [15, 11, 7, 3],
  [16, 12, 8, 4]
]

function isSameMatrix(matrixA, matrixB) {
  for (let i = 0; i < matrixA.length; i++) {
    for (let j = 0; j < matrixA[0].length; j++) {
      if (matrixA[i][j] !== matrixB[i][j]) {
        return false
      }
    }
  }
  return true
}

// console.assert(isSameMatrix(targetMatrix, testBoard.rotateMatrix(originMatrix)), '二维数组旋转逻辑有误')

test('rotated matrix should be same', () => {
  expect(!isSameMatrix(targetMatrix, testBoard.rotateMatrix(originMatrix))).toBe(true)
})
