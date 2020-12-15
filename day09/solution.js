const input = require('../file-reader.js').readFile('input.txt')

const PREAMBLE_LENGTH = 25

function findPair(i) {
    for (let j = i - PREAMBLE_LENGTH; j < i; j++) {
        for (let k = j + 1; k < i; k++) {
            if (input[i] === input[j] + input[k]) {
                return [input[j], input[k]]
            }
        }
    }
    return false
}

function part1() {
    for (let i = PREAMBLE_LENGTH; i < input.length; i++) {
        if (!findPair(i)) {
            return input[i];
        }
    }
}

const part1Answer = part1()
console.log('Part 1:', part1Answer)

function part2(answer) {
    for (let i = 0; i < input.length; i++) {
        let sum = input[i]
        let min = input[i]
        let max = input[i]
        for (let j = i + 1; j < input.length && sum < answer; j++) {
            sum += input[j]
            min = input[j] < min ? input[j] : min
            max = input[j] > max ? input[j] : max
        }
        if (sum === answer) {
            return min + max
        }
    }
}

console.log('Part 2:', part2(part1Answer))
