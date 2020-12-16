const input = [2, 0, 6, 12, 1, 3]
const map = new Map()

input.forEach((n, i) => map.set(n, i))

let nextValue = 0

for (let index = input.length; index < 30000000 - 1; index++) {
    const previousIndex = map.get(nextValue)
    if (previousIndex !== undefined) {
        map.set(nextValue, index)
        nextValue = index - previousIndex
    } else {
        map.set(nextValue, index)
        nextValue = 0
    }
}

console.log('Part 2:', nextValue)       // 3718541
