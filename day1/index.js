import fs from 'fs'

const getCalibrationValue = (inputLine) => {
    const digits = inputLine.split('').filter(c => ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(c))
    const firstDigit = digits?.length > 0 && digits[0]
    const lastDigit = digits?.length > 0 && digits.at(-1)
    return Number(`${firstDigit}${lastDigit}`)
}

export const sumAllCalibrationValues = (inputFile) => {
    const input = fs.readFileSync(inputFile, { encoding: 'UTF-8' }).split('\n')

    return input.reduce((prev, curr, currIdx, arr) => {
        return prev + getCalibrationValue(curr)
    }, 0)
}