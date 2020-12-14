const input = require('../file-reader.js').readFile('input.txt', '\n', String)

// convert the input into objects with the form { mask } or { address, value}
const instrs = input.map(line => {
    if (line.startsWith("mask")) {
        const [, mask] = line.split(" = ")
        return { mask }
    } else {
        const [, address, value] = line.match(/mem\[(\d+)\] = (\d+)/);
        return { address: Number(address), value: Number(value) }
    }
})

const mem = new Map()
let mask = null
instrs.forEach(instr => {
    if (instr.mask) {
        mask = instr.mask
    } else {
        const floatingAddress = instr.address.toString(2).padStart(36, '0')
        let addresses = [0n];
        [...mask].forEach((bit, index) => {
            addresses = addresses.map(b => b << 1n)
            if (bit === 'X') {
                addresses = [...addresses, ...addresses.map(e => e | 1n)]
            } else if (bit === '1' || floatingAddress[index] === '1') {
                addresses = addresses.map(e => e | 1n)
            }
        })

        addresses.forEach(addr => mem.set(addr, instr.value))
    }
})

let result = Array.from(mem.values()).reduce((sum, v) => sum + v, 0)
console.log('Part 2:', result)
