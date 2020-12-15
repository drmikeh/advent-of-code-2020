const data = require('../file-reader.js').readFile('input.txt', '\n', String, v => true)

function readPassports() {
    const passports = [];
    for (lineIndex = 0; lineIndex < data.length; lineIndex++) {
        const passport = {}
        while (data[lineIndex]) {
            const parts = data[lineIndex].split(' ')
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

const validators = {
    byr: function (value) {                     // byr(Birth Year) - four digits; at least 1920 and at most 2002.
        const year = Number(value)
        return year >= 1920 && year <= 2002
    },
    iyr: function (value) {                     // iyr(Issue Year) - four digits; at least 2010 and at most 2020.
        const year = Number(value)
        return year >= 2010 && year <= 2020
    },
    eyr: function (value) {                     // eyr(Expiration Year) - four digits; at least 2020 and at most 2030.
        const year = Number(value)
        return year >= 2020 && year <= 2030
    },
    hgt: function (value) {                                     // hgt(Height) - a number followed by either cm or in:
        const h = Number(value.slice(0, value.length - 2))
        const units = value.slice(value.length - 2)
        if (['cm', 'in'].includes(units) === false) {
            return false;
        }
        if (units === 'cm' && (h < 150 || h > 193)) {           // if cm, the number must be at least 150 and at most 193.
            return false
        } else if (units === 'in' && (h < 59 || h > 76)) {      // if in, the number must be at least 59 and at most 76.
            return false
        }
        return true
    },
    hcl: function (value) {                  // hcl(Hair Color) - a # followed by exactly six characters 0 - 9 or a - f.
        return /^#[0-9a-f]{6}/i.test(value)
    },
    ecl: function (value) {                 // ecl(Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
        return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)
    },
    pid: function (value) {                 // pid(Passport ID) - a nine - digit number, including leading zeroes.
        return value.length === 9 && isNaN(Number(value)) === false
    },
    cid: function (value) {                 // cid(Country ID) - ignored, missing or not.
        return true
    }
}

const REQUIRED_FIELDS = [
    'byr',    // Birth Year
    'iyr',    // Issue Year
    'eyr',    // Expiration Year
    'hgt',    // Height
    'hcl',    // Hair Color
    'ecl',    // Eye Color
    'pid',    // Passport ID
    // 'cid',    // Country ID
]

function isValid(passport) {
    for (let i = 0; i < REQUIRED_FIELDS.length; i++) {
        const field = REQUIRED_FIELDS[i]
        const value = passport[field]
        if (!value) {
            return false;
        }
        if (!validators[field](value)) {
            return false
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
console.log('Part 2:', countValidPassports(passports))
