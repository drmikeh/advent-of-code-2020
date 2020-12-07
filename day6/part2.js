const data = require('../file-reader.js').readFile('data-ex.txt', '\n', String, v => true)

function intersection(a1, a2) {
    return a1.filter(value => a2.includes(value))
}

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
console.log(data)
console.log(groups)
console.log(groups.reduce((sum, g) => sum + g.size, 0))
