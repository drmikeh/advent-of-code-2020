const data = require('../file-reader.js').readFile('data.txt', '\n', line => {
    const parts = line.split(' ')
    const [first, second] = parts[0].split('-')
    const letter = parts[1][0]
    const password = parts[2]
    return { first, second, letter, password }
})

const numValid = data.reduce((count, entry) => {
    const { first, second, letter, password } = entry
    let numMatches = 0
    if (password[first - 1] === letter) {
        ++numMatches;
    }
    if (password[second - 1] === letter) {
        ++numMatches;
    }
    return numMatches === 1 ? count + 1 : count
}, 0)

console.log(numValid)
