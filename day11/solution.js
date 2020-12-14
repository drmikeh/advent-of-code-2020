const input = require('../file-reader.js').readFile('input-ex.txt', '\n', String).map(row => row.split(''))

const NUM_ROWS = input.length
const NUM_COLS = input[0].length

const EMPTY_SEAT = 'L'
const OCCUPIED_SEAT = '#'
const FLOOR = '.'

const LOGGING = false

function log(...args) {
    if (LOGGING) {
        console.log(...args)
    }
}

function print(grid) {
    grid.forEach(row => {
        log(row.join(''))
    })
    log()
}

const NUM_DIRS = 8
const ROW_DIRS = [-1, +1, +0, +0, -1, -1, +1, +1]
const COL_DIRS = [+0, +0, -1, +1, -1, +1, -1, +1]

function isValid(row, col) {
    return 0 <= row && row < NUM_ROWS && 0 <= col && col < NUM_COLS
}

let zcount = 0
function getNumOccupied(grid, ri, ci, lookOverFloor) {
    zcount++
    let total = 0

    for (let dir = 0; dir < NUM_DIRS; dir++) {
        let nr = ri + ROW_DIRS[dir]
        let nc = ci + COL_DIRS[dir]

        if (lookOverFloor) {
            while (isValid(nr, nc) && grid[nr][nc] === FLOOR) {
                nr += ROW_DIRS[dir]
                nc += COL_DIRS[dir]
            }
        }

        if (isValid(nr, nc) && grid[nr][nc] === OCCUPIED_SEAT) {
            total++
        }
    }
    return total
}

function main(grid, maxAllowed, lookOverFloor) {
    let changed = null
    let round = 1
    do {
        console.log(`--- Round ${round++} ---`)
        changed = false
        let nextArea = grid.map(row => row.map(cell => cell)) // deep copy of 2D array
        for (let ri = 0; ri < NUM_ROWS; ri++) {
            for (let ci = 0; ci < NUM_COLS; ci++) {
                let numOccupied = getNumOccupied(grid, ri, ci, lookOverFloor)
                if (grid[ri][ci] === EMPTY_SEAT && numOccupied === 0) {
                    nextArea[ri][ci] = OCCUPIED_SEAT
                    changed = true
                } else if (grid[ri][ci] === OCCUPIED_SEAT && numOccupied >= maxAllowed) {
                    nextArea[ri][ci] = EMPTY_SEAT
                    changed = true
                }
            }
        }
        grid = nextArea
        print(grid)
    } while (changed)
    return grid
}

function countOccupiedSeats(grid) {
    return grid.reduce((sum, row) => sum + row.reduce((rowSum, cell) => rowSum + (cell === OCCUPIED_SEAT ? 1 : 0), 0), 0)
}

// console.log('Part 1:', countOccupiedSeats(main(input, 4, false)))
console.log('Part 2:', countOccupiedSeats(main(input, 5, true)))
console.log({ zcount })
