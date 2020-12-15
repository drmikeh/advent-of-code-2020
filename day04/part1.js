const input = require('../file-reader.js').readFile('input.txt', '\n', String, v => true)

function readPassports() {
    const passports = [];
    for (lineIndex = 0; lineIndex < input.length; lineIndex++) {
        const passport = {}
        while (input[lineIndex]) {
            const parts = input[lineIndex].split(' ')
            parts.forEach(p => {
                const [key, value] = p.split(':')
                passport[key] = value
            })
            lineIndex++
        }
        passports.push(passport)
    }
    return passports
}

function isValid(passport) {
    const requiredFields = [
        'byr',    // Birth Year
        'iyr',    // Issue Year
        'eyr',    // Expiration Year
        'hgt',    // Height
        'hcl',    // Hair Color
        'ecl',    // Eye Color
        'pid',    // Passport ID
        // 'cid',    // Country ID
    ]
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i]
        const value = passport[field]
        if (!value) {
            return false;
        }
    }
    return true;
}

function countValidPassports(passports) {
    return passports.reduce((sum, p) => {
        return isValid(p) ? sum + 1 : sum
    }, 0)
}

const passports = readPassports();
console.log('Part 1:', countValidPassports(passports))
