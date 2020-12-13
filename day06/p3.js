const fs = require('fs')
const data = fs.readFileSync('data-ex.txt', 'utf-8')
console.log(data.split('\n'))
