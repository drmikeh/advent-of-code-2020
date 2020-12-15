const input = require('../file-reader.js').readFile('input.txt').sort((a, b) => a - b)

input.unshift(0)
input.push(input[input.length - 1] + 3)

const cache = {}

function part2(n = 0) {
    if (n === input.length - 1) return 1
    if (n in cache) return cache[n]

    let ans = 0
    const upper = input.length < (n + 3) ? input.length : n + 3
    for (let i = n + 1; i <= upper; i++) {
        if (input[i] - input[n] <= 3) {
            ans += part2(i)
        }
    }
    cache[n] = ans
    return ans
}

console.log('Part 2:', part2())   // 12089663946752
