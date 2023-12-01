import fs from 'fs'

const letter2Number = {
    'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'
}

export const getSingleDigits = (line) => {
    return line.split('').filter(c => ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(c))
}

export const getSingleAndLetterDigits = (line) => {
    const digitsPattern = /(?:[0-9]|one|two|three|four|five|six|seven|eight|nine)/gi;
    return line.match(digitsPattern).map(digit => Number(letter2Number[digit] || digit))
}

const getCalibrationValue = (inputLine, getDigitsFromLine) => {
    const digits = getDigitsFromLine(inputLine)
    const firstDigit = digits?.length > 0 && digits[0]
    const lastDigit = digits?.length > 0 && digits.at(-1)
    return Number(`${firstDigit}${lastDigit}`)
}

export const sumAllCalibrationValues = (inputFile, getDigitsFromLine = getSingleDigits) => {
    const input = fs.readFileSync(inputFile, { encoding: 'UTF-8' }).split('\n')

    return input.reduce((prev, curr, currIdx, arr) => {
        return prev + getCalibrationValue(curr, getDigitsFromLine)
    }, 0)
}