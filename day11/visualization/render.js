const NUM_ROWS = grid.length
const NUM_COLS = grid[0].length

const changeCache = createArray([NUM_ROWS, NUM_COLS], true)

const gridElement = document.getElementById('grid')

function drawGrid() {
    for (let r = 0; r < NUM_ROWS; r++) {
        const line = document.createElement('tr')
        for (let c = 0; c < NUM_COLS; c++) {
            const el = document.createElement('td')
            el.id = `${r}-${c}`
            el.innerHTML = grid[r][c]
            line.appendChild(el)
        }
        gridElement.appendChild(line)
    }
}

drawGrid()

function updateGrid() {
    for (let r = 0; r < NUM_ROWS; r++) {
        for (let c = 0; c < NUM_COLS; c++) {
            const el = document.getElementById(`${r}-${c}`)
            if (changeCache[r][c]) {
                el.innerHTML = grid[r][c]
                el.className = 'changed'
            } else {
                el.className = ''
            }
        }
    }
}