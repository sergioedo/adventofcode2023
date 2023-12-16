import fs from 'fs'

const isDigit = (char) => char && char.match(/[0-9]/)
const isSimbol = (char) => char && char !== '.' && !isDigit(char)
const isNumber = (text) => text.match(/[0-9]+/)
const toNumber = (text) => Number(text.match(/[0-9]+/)[0])

const hasAdjacentSymbol = (grid, row, col) => {
    if (isSimbol(grid?.[row - 1]?.[col - 1])) return true
    if (isSimbol(grid?.[row - 1]?.[col + 0])) return true
    if (isSimbol(grid?.[row - 1]?.[col + 1])) return true
    if (isSimbol(grid?.[row + 0]?.[col - 1])) return true
    if (isSimbol(grid?.[row + 0]?.[col + 1])) return true
    if (isSimbol(grid?.[row + 1]?.[col - 1])) return true
    if (isSimbol(grid?.[row + 1]?.[col + 0])) return true
    if (isSimbol(grid?.[row + 1]?.[col + 1])) return true
    return false
}

export const sumPartNumbers = (inputFile) => {
    const schematic = fs.readFileSync(inputFile, { encoding: 'UTF-8' }).split('\n').map(line => line.split(''))

    const validParts = []
    schematic.map((row, rowIdx) => {
        const partDigits = []
        let isValidPart = false
        row.map((col, colIdx) => {
            if (isDigit(schematic[rowIdx][colIdx])) {
                partDigits.push(schematic[rowIdx][colIdx])
                if (hasAdjacentSymbol(schematic, rowIdx, colIdx)) isValidPart = true
            } else {
                const part = partDigits.join('')
                if (isValidPart && isNumber(part)) {
                    validParts.push(toNumber(part))
                }
                partDigits.length = 0 //reset partDigits
                isValidPart = false
            }
        })
        //end of line
        const part = partDigits.join('')
        if (isValidPart && isNumber(part)) {
            validParts.push(toNumber(part))
        }
        partDigits.length = 0 //reset partDigits
        isValidPart = false
    })
    return validParts.reduce((counter, validPart) => counter + validPart, 0)
}