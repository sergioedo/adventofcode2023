import { expect, test } from 'vitest'
import { sumPartNumbers } from 'day3'
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