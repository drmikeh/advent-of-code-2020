const input = require('../file-reader.js').readFile('input.txt')

function findMatchingPair(sum) {
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
            if (input[i] + input[j] === sum) {
                return [input[i], input[j]]
            }
        }
    }
    throw new Error("Solution not found")
}

const pair = findMatchingPair(2020)
console.log('Part 1', pair[0] * pair[1])
