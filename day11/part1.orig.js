const input = require('../file-reader.js').readFile('input-ex.txt', '\n', String).map(row => row.split(''))

const NUM_ROWS = input.length
const NUM_COLS = area[0].length

const EMPTY_SEAT = 'L'
const OCCUPIED_SEAT = '#'

function print(area) {
    area.forEach(row => {
        console.log(row.join(''))
    })
    console.log()
}

function fillAllEmptySeats(area) {
    return area.map(row => row.map(cell => cell === EMPTY_SEAT ? OCCUPIED_SEAT : cell))
}

const NUM_DIRS = 8
const ROW_DIRS = [-1, +1, +0, +0, -1, -1, +1, +1]
const COL_DIRS = [+0, +0, -1, +1, -1, +1, -1, +1]

function isValid(r, c) {
    return 0 <= r && r <= NUM_ROWS && 0 <= c && c <= NUM_COLS
}



// remove crowded seats
function emptyCrowdedSeats(area) {
    return area.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
            cell === OCCUPIED_SEAT && isCrowded(area, rowIndex, colIndex) ? EMPTY_SEAT : cell))
}


function fillAttractiveSeats(area) {
    return area.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
            if (cell === EMPTY_SEAT && !isCrowded(area, rowIndex, colIndex)) {
                console.log(rowIndex, colIndex, 'converting to OCCUPIED_SEAT')
                return OCCUPIED_SEAT
            } else {
                return cell
            }
        })
    })
}

print(input)
let area = fillAllEmptySeats(input)
print(area)
area = emptyCrowdedSeats(area)
print(area)
let numOccupiedSeats = countOccupiedSeats(input)
let prevNumOccupiedSeats = numOccupiedSeats
let round = 1
do {
    console.log(`--- Round ${round++} ---`)
    prevNumOccupiedSeats = numOccupiedSeats
    area = fillAttractiveSeats(area)
    print(area)
    area = emptyCrowdedSeats(area)
    print(area)
    numOccupiedSeats = countOccupiedSeats(area)
    console.log(numOccupiedSeats)
} while (numOccupiedSeats !== prevNumOccupiedSeats)
