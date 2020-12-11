const data = require('../file-reader.js').readFile('data.txt', '\n', String)

let debug = false

function log(...args) {
    if (debug) {
        console.log(...args)
    }
}

const containers = data.map(rule => {
    let [name, contents] = rule.split('contain')
    name = name.trim().replace('bags', 'bag')
    contents = contents.trim().split(', ').map(c => {
        let [num, name] = c.split(/ (.+)/)
        name = name.replace('.', '').replace('bags', 'bag')
        num = Number(num) || 0
        return {
            name,
            num
        }
    })
    return { name, contents }
})

log(JSON.stringify(containers, null, 2))

function replacer(key, value) {
    const originalObject = this[key];
    if (originalObject instanceof Map) {
        return [...originalObject]
    } else if (key === 'parent') {
        return 'parent'
    } else if (key === 'backEdges') {
        return 'backEdges'
    } else {
        return value;
    }
}

// recursively find a node, searching through the nodes array
// and all of those node's descendants
function findNode(nodes, label) {
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].label === label) {
            return nodes[i]
        }
        else {
            const found = findNode(Array.from(nodes[i].forwardEdges.keys()), label)
            if (found) {
                return found
            }
        }
    }
}

function convertToGraph(containers, nodes = [], parent = null, depth = 0) {
    containers.forEach(c => {
        const label = c.name
        const weight = c.num
        let node = findNode(nodes, label)
        if (!node) node = { label, forwardEdges: new Map(), backEdges: new Map() }
        if (parent) {
            parent.forwardEdges.set(node, weight)
            node.backEdges.set(parent, weight)
        }
        else nodes.push(node)
        if (c.contents) convertToGraph(c.contents, nodes, node, depth + 1)
    })
    return nodes
}

const sourceNodes = convertToGraph(containers)

function findRoots(nodes, child, roots = new Set()) {
    log(child)
    const parents = Array.from(child.backEdges.keys())
    parents.forEach(parent => {
        roots.add(parent)
        findRoots(nodes, parent, roots)
    })
    return roots
}


const shinyGoldBag = findNode(sourceNodes, 'shiny gold bag')
console.log('Part 1:', findRoots(sourceNodes, shinyGoldBag).size)

function countBags(node) {
    let sum = 0
    node.forwardEdges.forEach((num, child) => {
        sum += num + num * countBags(child)
    })
    return sum
}

console.log('Part 2:', countBags(shinyGoldBag))
