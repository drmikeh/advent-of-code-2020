const EMPTY_SEAT = 'L'
const OCCUPIED_SEAT = '#'
const FLOOR = '.'

const NUM_DIRS = 8
const ROW_DIRS = [-1, +1, +0, +0, -1, -1, +1, +1]
const COL_DIRS = [+0, +0, -1, +1, -1, +1, -1, +1]

function sleep(millis) {
    return new Promise(res => setTimeout(res, millis))
}

function isValid(row, col) {
    return 0 <= row && row < NUM_ROWS && 0 <= col && col < NUM_COLS
}

function getNumOccupied(ri, ci, lookOverFloor) {
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

function step(round, changed, lookOverFloor, maxAllowed) {
    console.log(`--- Round ${round} ---`)
    document.getElementById('round').innerHTML = `Round ${round}`
    round++
    changed = false
    let nextArea = grid.map(row => row.map(cell => cell)) // deep copy of 2D array
    for (let ri = 0; ri < NUM_ROWS; ri++) {
        for (let ci = 0; ci < NUM_COLS; ci++) {
            let numOccupied = getNumOccupied(ri, ci, lookOverFloor)
            if (grid[ri][ci] === EMPTY_SEAT && numOccupied === 0) {
                nextArea[ri][ci] = OCCUPIED_SEAT
                changed = true
                changeCache[ri][ci] = true
            } else if (grid[ri][ci] === OCCUPIED_SEAT && numOccupied >= maxAllowed) {
                nextArea[ri][ci] = EMPTY_SEAT
                changed = true
                changeCache[ri][ci] = true
            } else {
                changeCache[ri][ci] = false
            }
        }
    }
    return { nextArea, round, changed }
}

async function main(maxAllowed, lookOverFloor) {
    let changed = null
    let round = 1
    do {
        let nextArea
        ({ nextArea, round, changed } = step(round, changed, lookOverFloor, maxAllowed))
        grid = nextArea
        renderGrid(grid)
        await sleep(0)
    } while (changed)
    return grid
}

main(5, true)