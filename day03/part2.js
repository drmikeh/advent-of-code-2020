const input = require('../file-reader.js').readFile('input.txt', '\n', line => line.split(''))

function checkSlope([rowInc, colInc]) {
    let treeCount = 0
    for (let rowIndex = 0, colIndex = 0; rowIndex < input.length; rowIndex += rowInc, colIndex += colInc) {
        colIndex = colIndex % input[rowIndex].length
        const value = input[rowIndex][colIndex]
        treeCount += value === '#' ? 1 : 0
    }
    return treeCount
}

const slopes = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]]
const result = slopes.map(slope => checkSlope(slope)).reduce((acc, n) => acc * n, 1)
console.log('Part 2:', result)
