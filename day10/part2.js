const data = require('../file-reader.js').readFile('data.txt').sort((a, b) => a - b)

data.unshift(0)
data.push(data[data.length - 1] + 3)

const cache = {}

function part2(n = 0) {
    if (n === data.length - 1) return 1
    if (n in cache) return cache[n]

    let ans = 0
    const upper = data.length < (n + 3) ? data.length : n + 3
    for (let i = n + 1; i <= upper; i++) {
        if (data[i] - data[n] <= 3) {
            ans += part2(i)
        }
    }
    cache[n] = ans
    return ans
}

console.log('Part 2:', part2())   // 12089663946752
