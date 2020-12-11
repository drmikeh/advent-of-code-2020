
const cache = {};

function addToCache(key, value) {
    cache[key] = value
}

function findInCache(key) {
    return key in cache ? cache[key] : null
}

addToCache('apple', 3)
addToCache('orange', 5)

console.log(cache)

console.log(findInCache('apple'))
console.log(findInCache('banana'))

