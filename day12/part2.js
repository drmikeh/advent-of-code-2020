const input = require('../file-reader.js').readFile('input.txt', '\n', String)

const instructions = input.map(str => {
    const action = str.slice(0, 1)
    const amount = Number(str.slice(1))
    return { action, amount }
})

function rotateLeft(loc, times) {
    for (let t = 0; t < times; t++) {
        const saved = loc[0]
        loc[0] = -loc[1]
        loc[1] = saved
    }
}

function rotateRight(loc, times) {
    for (let t = 0; t < times; t++) {
        const saved = loc[0]
        loc[0] = loc[1]
        loc[1] = -saved
    }
}

const location = [0, 0]
const waypoint = [10, 1]

instructions.forEach(instr => {
    let rotationAmount = null
    switch (instr.action) {
        case 'N':
            waypoint[1] += instr.amount
            break;
        case 'S':
            waypoint[1] -= instr.amount
            break;
        case 'E':
            waypoint[0] += instr.amount
            break;
        case 'W':
            waypoint[0] -= instr.amount
            break;
        case 'L':
            rotationAmount = instr.amount / 90
            rotateLeft(waypoint, rotationAmount)
            break;
        case 'R':
            rotationAmount = instr.amount / 90
            rotateRight(waypoint, rotationAmount)
            break;
        case 'F':
            location[0] += waypoint[0] * instr.amount
            location[1] += waypoint[1] * instr.amount
            break;
        default:
            throw new Error('Unrecognized instruction:', instruction.instr)
    }
})

console.log('Part 2:', Math.abs(location[0]) + Math.abs(location[1]))
