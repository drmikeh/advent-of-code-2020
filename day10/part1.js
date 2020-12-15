const input = require('../file-reader.js').readFile('input.txt').sort((a, b) => a - b)

input.unshift(0)
input.push(input[input.length - 1] + 3)

function part1() {
    let numOneJolts = 0
    let numThreeJolts = 0
    for (let i = 1; i < input.length; i++) {
        const diff = input[i] - input[i - 1]
        if (diff === 1) numOneJolts++
        else if (diff === 3) numThreeJolts++
    }
    // console.log({ numOneJolts, numThreeJolts })
    return numOneJolts * numThreeJolts
}

console.log('Part 1:', part1())