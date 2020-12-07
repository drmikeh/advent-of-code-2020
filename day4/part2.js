const data = require('../file-reader.js').readFile('data.txt', '\n', String, v => true)

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

        let year
        switch (field) {
            // byr (Birth Year) - four digits; at least 1920 and at most 2002.
            case 'byr':
                year = Number(value)
                if (year < 1920 || year > 2002) {
                    return false;
                }
                break

            // iyr(Issue Year) - four digits; at least 2010 and at most 2020.
            case 'iyr':
                year = Number(value)
                if (year < 2010 || year > 2020) {
                    return false;
                }
                break

            // eyr(Expiration Year) - four digits; at least 2020 and at most 2030.
            case 'eyr':
                year = Number(value)
                if (year < 2020 || year > 2030) {
                    return false;
                }
                break

            // hgt(Height) - a number followed by either cm or in:
            // if cm, the number must be at least 150 and at most 193.
            // if in, the number must be at least 59 and at most 76.
            case 'hgt':
                const h = Number(value.slice(0, value.length - 2))
                const units = value.slice(value.length - 2)
                if (['cm', 'in'].includes(units) === false) {
                    return false;
                }
                if (units === 'cm' && (h < 150 || h > 193)) {
                    return false
                } else if (units === 'in' && (h < 59 || h > 76)) {
                    return false
                }
                break

            // hcl(Hair Color) - a # followed by exactly six characters 0 - 9 or a - f.
            case 'hcl':
                if (/^#[0-9a-f]{6}/i.test(value) === false) {
                    return false
                }
                break

            // ecl(Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
            case 'ecl':
                if (['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value) === false) {
                    return false
                }
                break;

            // pid(Passport ID) - a nine - digit number, including leading zeroes.
            case 'pid':
                if (value.length !== 9 || isNaN(Number(value))) {
                    return false;
                }
                break;

            // cid(Country ID) - ignored, missing or not.
            case 'cid':
                break;

            default:
                throw new Error(`Unrecognized field: ${field}`)
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
console.log(countValidPassports(passports))
