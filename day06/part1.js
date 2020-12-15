const input = require('../file-reader.js').readFile('input.txt', '\n', String, v => true)

// group lines using a blank line as the separator
function readGroups() {
    const groups = [];
    for (lineIndex = 0; lineIndex < input.length; lineIndex++) {
        const group = []
        while (input[lineIndex]) {
            group.push(input[lineIndex++])
        }
        groups.push(group)
    }
    return groups
}

// convert 2D array of strings to 1D array of sets
function toSets(groups) {
    return groups.map(g => g.reduce((set, str) => new Set([...set, ...str.split('')]), new Set()))
}

const groups = readGroups()
const sets = toSets(groups)
console.log('Part 1:', sets.reduce((sum, g) => sum + g.size, 0))
