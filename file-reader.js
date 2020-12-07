const fs = require('fs')
exports.readFile = (fileName, separator = '\n', mapFunction = Number, filterFn = Boolean) => {
    return fs
        .readFileSync(fileName, 'utf-8')
        .split(separator)
        .filter(filterFn)
        .map(mapFunction)
}
