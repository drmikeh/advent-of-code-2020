const data = require('../file-reader.js').readFile('data.txt')

function findMatchingTriplet(sum) {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            for (let k = 0; k < data.length; k++) {
                if (data[i] + data[j] + data[k] === sum) {
                    return [data[i], data[j], data[k]]
                }
            }
        }
    }
    throw new Error("Solution not found")
}

const triplet = findMatchingTriplet(2020)
console.log(triplet[0] * triplet[1] * triplet[2])
