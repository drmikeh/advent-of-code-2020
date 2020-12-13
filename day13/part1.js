const input = require('../file-reader.js').readFile('input.txt', '\n', String)

const earliestDeparture = Number(input[0])
const ids = input[1].split(',').filter(id => id !== 'x').map(Number)

// console.log({ earliestDeparture, ids })

const minBus = ids.
    map(id => ({ id, v: Math.ceil(earliestDeparture / id) * id })).
    reduce((min, bus) => min.v < bus.v ? min : bus)

console.log('Part 1:', minBus.id * (minBus.v - earliestDeparture))
