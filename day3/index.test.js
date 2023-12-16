import { expect, test } from 'vitest'
import { sumPartNumbers, sumGearRatios } from 'day3'
import path from 'path'

test('Test sumPartNumbers sample input', () => {
    const inputFile = path.join('day3', 'input.sample.txt')
    const expectedOutput = 4361

    expect(sumPartNumbers(inputFile)).toBe(expectedOutput)
})

test('Test sumPartNumbers input', () => {
    const inputFile = path.join('day3', 'input.txt')
    const expectedOutput = 551094

    expect(sumPartNumbers(inputFile)).toBe(expectedOutput)
})

test('Test sumGearRatios sample input', () => {
    const inputFile = path.join('day3', 'input.sample.txt')
    const expectedOutput = 467835

    expect(sumGearRatios(inputFile)).toBe(expectedOutput)
})

test('Test sumGearRatios input', () => {
    const inputFile = path.join('day3', 'input.txt')
    const expectedOutput = 80179647

    expect(sumGearRatios(inputFile)).toBe(expectedOutput)
})