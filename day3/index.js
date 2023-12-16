import fs from 'fs'

const isDigit = (char) => char && char.match(/[0-9]/)
const isSimbol = (char) => char && char !== '.' && !isDigit(char)
const isGearSimbol = (char) => char && char === '*'
const isNumber = (text) => text.match(/[0-9]+/)
const toNumber = (text) => Number(text.match(/[0-9]+/)[0])

const getAdjacentSymbolsIndex = (grid, row, col, isSimbol) => {
    const adjacentsSimbols = []
    if (isSimbol(grid?.[row - 1]?.[col - 1])) adjacentsSimbols.push([row - 1, col - 1])
    if (isSimbol(grid?.[row - 1]?.[col + 0])) adjacentsSimbols.push([row - 1, col + 0])
    if (isSimbol(grid?.[row - 1]?.[col + 1])) adjacentsSimbols.push([row - 1, col + 1])
    if (isSimbol(grid?.[row + 0]?.[col - 1])) adjacentsSimbols.push([row + 0, col - 1])
    if (isSimbol(grid?.[row + 0]?.[col + 1])) adjacentsSimbols.push([row + 0, col + 1])
    if (isSimbol(grid?.[row + 1]?.[col - 1])) adjacentsSimbols.push([row + 1, col - 1])
    if (isSimbol(grid?.[row + 1]?.[col + 0])) adjacentsSimbols.push([row + 1, col + 0])
    if (isSimbol(grid?.[row + 1]?.[col + 1])) adjacentsSimbols.push([row + 1, col + 1])
    return adjacentsSimbols
}

const hasAdjacentSymbol = (grid, row, col) => (getAdjacentSymbolsIndex(grid, row, col, isSimbol).length > 0)

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

const getAdjacentSimbolsIndexByRowRange = (grid, row, startCol, endCol, isSimbol) => {
    const adjacentsSimbols = []
    for (let col = startCol; col <= endCol; col++) {
        adjacentsSimbols.push(...getAdjacentSymbolsIndex(grid, row, col, isSimbol).map(idx => idx.join('-')))
    }
    return [...new Set(adjacentsSimbols)]
}

export const sumGearRatios = (inputFile) => {
    const schematic = fs.readFileSync(inputFile, { encoding: 'UTF-8' }).split('\n').map(line => line.split(''))

    const gearsNumbers = {}  // store gears by index "row-col", and value is its adjacents numbers as an array
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
                    const validPart = toNumber(part)
                    // Look for adjacent gears, and add to them
                    const gearsIndex = getAdjacentSimbolsIndexByRowRange(schematic, rowIdx, colIdx - 1 - (part.length - 1), colIdx - 1, isGearSimbol)
                    gearsIndex.map(gearIdx => {
                        if (!gearsNumbers[gearIdx]) gearsNumbers[gearIdx] = [] //init gear numbers array
                        gearsNumbers[gearIdx].push(validPart)
                    })
                }
                partDigits.length = 0 //reset partDigits
                isValidPart = false
            }
        })
        //end of line
        const colIdx = row.length
        const part = partDigits.join('')
        if (isValidPart && isNumber(part)) {
            const validPart = toNumber(part)
            // Look for adjacent gears, and add to them
            const gearsIndex = getAdjacentSimbolsIndexByRowRange(schematic, rowIdx, colIdx - 1 - (part.length - 1), colIdx - 1, isGearSimbol)
            gearsIndex.map(gearIdx => {
                if (!gearsNumbers[gearIdx]) gearsNumbers[gearIdx] = [] //init gear numbers array
                gearsNumbers[gearIdx].push(validPart)
            })
        }
        partDigits.length = 0 //reset partDigits
        isValidPart = false
    })

    return Object.keys(gearsNumbers).filter(gearIdx => gearsNumbers[gearIdx].length === 2)
        .reduce((counter, gearIdx) => {
            const gearRatio = gearsNumbers[gearIdx][0] * gearsNumbers[gearIdx][1]
            return counter + gearRatio
        }, 0)
}