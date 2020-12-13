const data = require('../file-reader.js').readFile('data.txt', '\n', line => line.split(''))
let treeCount = 0
for (let rowIndex = 0, colIndex = 0; rowIndex < data.length; rowIndex++, colIndex += 3) {
    colIndex = colIndex % data[rowIndex].length
    const value = data[rowIndex][colIndex]
    treeCount += value === '#' ? 1 : 0
}
console.log(treeCount)
