const data = require('../file-reader.js').readFile('data.txt')

// console.log(data)

const PREAMBLE_LENGTH = 25

function findPair(i) {
    for (let j = i - PREAMBLE_LENGTH; j < i; j++) {
        for (let k = j + 1; k < i; k++) {
            if (data[i] === data[j] + data[k]) {
                return [data[j], data[k]]
            }
        }
    }
    return false
}

function part1() {
    for (let i = PREAMBLE_LENGTH; i < data.length; i++) {
        if (!findPair(i)) {
            return data[i];
        }
    }
}

const part1Answer = part1()
console.log('Part 1:', part1Answer)

function part2(answer) {
    for (let i = 0; i < data.length; i++) {
        let sum = data[i]
        let min = data[i]
        let max = data[i]
        for (let j = i + 1; j < data.length && sum < answer; j++) {
            sum += data[j]
            min = data[j] < min ? data[j] : min
            max = data[j] > max ? data[j] : max
        }
        if (sum === answer) {
            return min + max
        }
    }
}

console.log('Part 2:', part2(part1Answer))
