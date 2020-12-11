const data = require('../file-reader.js').readFile('data.txt', '\n', String)
const assert = require('assert')

function binarySearch(min, max, letters, lowerChar, upperChar) {

    for (let n = 0; n < letters.length; n++) {
        const ch = letters[n]
        const mid = (max - min + 1) / 2
        if (ch === lowerChar) {
            max -= mid
        } else if (ch === upperChar) {
            min += mid
        }
    }
    assert(min === max)
    return min
}

function findSeat(boardingPassValue) {
    const rowPart = boardingPassValue.slice(0, 7)
    const colPart = boardingPassValue.slice(7)

    const row = binarySearch(0, 127, rowPart, 'F', 'B')
    const col = binarySearch(0, 7, colPart, 'L', 'R')

    return ([row, col])
}

function calc(passport) {
    const [row, col] = findSeat(passport)
    return row * 8 + col
}

const seats = data.map(calc).sort((a, b) => a - b)
for (i = 1; i < seats.length; i++) {
    if (seats[i] !== seats[i - 1] + 1) {
        console.log(seats[i - 1] + 1)
    }
}