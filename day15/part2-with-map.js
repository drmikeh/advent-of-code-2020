const input = [2, 0, 6, 12, 1, 3]

const map = new Map()
input.forEach((v, i) => map.set(v, [i]))

function updateMap(map, k, v) {
    const arr = map.get(k)
    if (arr) arr.push(v)
    else map.set(k, [v])
}

let lastValue = Array.from(map.keys()).pop()

for (let index = input.length; index < 30000000; index++) {
    const lastIndex = map.get(lastValue) || null
    if (!lastIndex) {
        lastValue = 0
        updateMap(map, lastValue, index)
    }
    else if (lastIndex.length === 1) {
        lastValue = index - lastIndex[lastIndex.length - 1] - 1
        updateMap(map, lastValue, index)
    } else {
        lastValue = index - lastIndex[lastIndex.length - 2] - 1
        updateMap(map, lastValue, index)
    }
    // if (index % 1000000 === 0) console.log(map.size)
}

console.log('Part 2:', lastValue)       // 3718541
