const data = require('../file-reader.js').readFile('data.txt').sort((a, b) => a - b)

data.unshift(0)
data.push(data[data.length - 1] + 3)
// console.log(data)

function part1() {
    let numOneJolts = 0
    let numThreeJolts = 0
    for (let i = 1; i < data.length; i++) {
        const diff = data[i] - data[i - 1]
        if (diff === 1) numOneJolts++
        else if (diff === 3) numThreeJolts++
    }
    console.log({ numOneJolts, numThreeJolts })
    return numOneJolts * numThreeJolts
}

console.log('Part 1:', part1())