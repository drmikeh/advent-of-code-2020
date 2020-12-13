const data = require('../file-reader.js').readFile('data.txt', '\n', line => {
    const parts = line.split(' ')
    const [min, max] = parts[0].split('-')
    const letter = parts[1][0]
    const password = parts[2]
    return { min, max, letter, password }
})

function countLetter(str, letter) {
    return [...str].reduce((count, ch) => ch === letter ? count + 1 : count, 0)
}

const numValid = data.reduce((count, entry) => {
    const { min, max, letter, password } = entry
    const letterCount = countLetter(password, letter)
    return min <= letterCount && letterCount <= max ? count + 1 : count
}, 0)

console.log(numValid)
