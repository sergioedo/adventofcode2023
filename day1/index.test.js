import { expect, test } from 'vitest'
import { sumAllCalibrationValues } from 'day1'
import path from 'path'

test('Test sumAllCalibrationValues sample input', () => {
    const inputFile = path.join('day1', 'input.sample.txt')
    const expectedOutput = 142

    expect(sumAllCalibrationValues(inputFile)).toBe(expectedOutput)
})

test('Test sumAllCalibrationValues input', () => {
    const inputFile = path.join('day1', 'input.txt')
    const expectedOutput = 54561

    expect(sumAllCalibrationValues(inputFile)).toBe(expectedOutput)
})