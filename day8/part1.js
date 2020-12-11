const { exec } = require('child_process')

const data = require('../file-reader.js').readFile('data.txt', '\n', String)

let debug = false
function log(...args) {
    if (debug) console.log(...args)
}

function makeOperations() {
    const operations = data.map(line => {
        const [opcode, arg] = line.split(' ')
        return { opcode, arg: Number(arg), visited: 0, sequence: null }
    })
    return operations
}

const operations = makeOperations()

function resetOperations() {
    operations.forEach(op => {
        op.visited = 0;
        op.sequence = null;
    })
}

function execute(operations) {
    let ptr = 0
    let accumulator = 0
    let count = 1
    while (true) {
        log({ accumulator, ptr })
        log(operations)
        const op = operations[ptr]
        op.visited++
        op.sequence = count++
        log({ op })
        if (op.visited === 2) {
            return [false, accumulator]
        }
        switch (op.opcode) {
            case 'nop':
                ptr++
                break
            case 'acc':
                ptr++
                accumulator += op.arg
                break
            case 'jmp':
                ptr += op.arg
                break
        }
        if (ptr === operations.length) {
            return [true, accumulator]
        }
    }
}

console.log('Part 1:', execute({ ...operations })[1])
resetOperations()

function part2() {
    let terminated = false
    let ptr = 0
    while (true) {
        const op = operations[ptr++]
        if (op.opcode === 'nop') {
            op.opcode = 'jmp'
            const [term, accumulator] = execute(operations)
            op.opcode = 'nop'
            if (term) {
                return accumulator
            }
        } else if (op.opcode === 'jmp') {
            op.opcode = 'nop'
            const [term, accumulator] = execute(operations)
            op.opcode = 'jmp'
            if (term) {
                return accumulator
            }
        }
        resetOperations()
    }
}

console.log('Part 2:', part2())
