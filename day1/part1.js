const data = require('../file-reader.js').readFile('data.txt')

function findMatchingPair(sum) {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (data[i] + data[j] === sum) {
                return [data[i], data[j]]
            }
        }
    }
    throw new Error("Solution not found")
}

const pair = findMatchingPair(2020)
console.log(pair[0] * pair[1])
