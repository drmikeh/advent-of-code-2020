const data = require('../file-reader.js').readFile('data-ex.txt', '\n', String, v => true)

function readGroups() {
    const groups = [];
    for (lineIndex = 0; lineIndex < data.length; lineIndex++) {
        const group = new Set()
        while (data[lineIndex]) {
            data[lineIndex].split('').forEach(ch => group.add(ch))
            lineIndex++
        }
        groups.push(group)
    }
    return groups
}

const groups = readGroups()
console.log(groups)
console.log(groups.reduce((sum, g) => sum + g.size, 0))
