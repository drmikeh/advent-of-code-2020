const data = require('../file-reader.js').readFile('data.txt', '\n', line => line.split(''))

function checkSlope([rowInc, colInc]) {
    let treeCount = 0
    for (let rowIndex = 0, colIndex = 0; rowIndex < data.length; rowIndex += rowInc, colIndex += colInc) {
        colIndex = colIndex % data[rowIndex].length
        const value = data[rowIndex][colIndex]
        treeCount += value === '#' ? 1 : 0
    }
    return treeCount
}

const slopes = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]]
const result = slopes.map(slope => checkSlope(slope)).reduce((acc, n) => acc * n, 1)
console.log(result)
