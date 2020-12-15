const data = require('../file-reader.js').readFile('input.txt', '\n', String, v => true)

// group lines using a blank line as the separator
function readGroups() {
    const groups = [];
    for (lineIndex = 0; lineIndex < data.length; lineIndex++) {
        const group = []
        while (data[lineIndex]) {
            group.push(data[lineIndex++])
        }
        groups.push(group)
    }
    return groups
}

function calcIntersection(a1, a2) {
    return a1.filter(x => a2.includes(x))
}

function doIntersections(groups) {
    return groups.map(g => {
        let arr = g[0].split('')
        for (let i = 1; i < g.length; i++) {
            arr = calcIntersection(arr, g[i].split(''))
        }
        return arr
    })
}

const groups = readGroups()
const intersections = doIntersections(groups)
console.log('Part 2:', intersections.reduce((sum, i) => sum + i.length, 0))
