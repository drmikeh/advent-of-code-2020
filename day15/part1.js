const input = [2, 0, 6, 12, 1, 3]

function findPreviousIndex(v) {
    for (let i = input.length - 2; i >= 0; i--) {
        if (input[i] === v) {
            return i
        }
    }
    return input.length - 1
}

while (input.length < 2020) {
    const last = input[input.length - 1]
    const distance = input.length - 1 - findPreviousIndex(last)
    input.push(distance)
}

console.log(input[input.length - 1])
