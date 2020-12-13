const input = require('../file-reader.js').readFile('input.txt', '\n', String)
const buses = input[1].split(',').
    map((id, index) => ({ id: Number(id), offset: index })).
    filter(({ id }) => !isNaN(id))

let time = buses[0].id
let step = buses[0].id

for (let n = 1; n < buses.length; n++) {
    const { id, offset } = buses[n];
    while ((time + offset) % id !== 0) {
        time += step;
    }
    step *= id;
}

console.log(time)
