const input = require('../file-reader.js').readFile('input.txt', '\n', line => line.split(''))
let treeCount = 0
for (let rowIndex = 0, colIndex = 0; rowIndex < input.length; rowIndex++, colIndex += 3) {
    colIndex = colIndex % input[rowIndex].length
    const value = input[rowIndex][colIndex]
    treeCount += value === '#' ? 1 : 0
}
console.log('Part 1:', treeCount)
