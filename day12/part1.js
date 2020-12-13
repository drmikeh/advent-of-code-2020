const input = require('../file-reader.js').readFile('input.txt', '\n', String)

const instructions = input.map(str => {
    const action = str.slice(0, 1)
    const amount = Number(str.slice(1))
    return { action, amount }
})

const EAST = [1, 0]
const WEST = [-1, 0]
const NORTH = [0, 1]
const SOUTH = [0, -1]

const DIRS = [EAST, SOUTH, WEST, NORTH]  // clockwise is positive

let directionIndex = 0
const location = [0, 0]

instructions.forEach(instr => {
    let rotationAmount = null
    switch (instr.action) {
        case 'N':
            location[1] += instr.amount
            break;
        case 'S':
            location[1] -= instr.amount
            break;
        case 'E':
            location[0] += instr.amount
            break;
        case 'W':
            location[0] -= instr.amount
            break;
        case 'L':
            rotationAmount = instr.amount / 90
            directionIndex = (directionIndex - rotationAmount + 4) % 4
            break;
        case 'R':
            rotationAmount = instr.amount / 90
            directionIndex = (directionIndex + rotationAmount) % 4
            break;
        case 'F':
            const direction = DIRS[directionIndex]
            location[0] += direction[0] * instr.amount
            location[1] += direction[1] * instr.amount
            break;
        default:
            throw new Error('Unrecognized instruction:', instruction.instr)
    }
})

console.log('Part 1:', Math.abs(location[0]) + Math.abs(location[1]))