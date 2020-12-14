const input = require('../file-reader.js').readFile('input.txt', '\n', String)

console.log(input)

const instrs = input.map(line => {
    if (line.startsWith("mask")) {
        const [, mask] = line.split(" = ")
        return { mask }
    } else {
        const [, address, value] = line.match(/mem\[(\d+)\] = (\d+)/);
        return { address: Number(address), value: Number(value) }
    }
})

console.log(instrs)

const mem = new Map()
let mask = null
instrs.forEach(instr => {
    if (instr.mask) {
        mask = instr.mask
    } else {
        const value = parseInt(
            instr.value
                .toString(2)
                .padStart(36, '0')
                .split('')
                .map((bit, i) => (mask[i] === 'X' ? bit : mask[i]))
                .join(''),
            2
        )
        mem.set(instr.address, value)
    }
})

let result = Array.from(mem.values()).reduce((sum, v) => sum + v, 0)
console.log('Part 1:', result)
