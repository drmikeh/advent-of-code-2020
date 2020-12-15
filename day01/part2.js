const input = require('../file-reader.js').readFile('input.txt')

function findMatchingTriplet(sum) {
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
            for (let k = 0; k < input.length; k++) {
                if (input[i] + input[j] + input[k] === sum) {
                    return [input[i], input[j], input[k]]
                }
            }
        }
    }
    throw new Error("Solution not found")
}

const triplet = findMatchingTriplet(2020)
console.log('Part 2:', triplet[0] * triplet[1] * triplet[2])
