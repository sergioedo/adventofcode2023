import { expect, test } from 'vitest'
import { sumAllCalibrationValues, getSingleAndLetterDigits } from 'day1'
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

test('Test sumAllCalibrationValues sample input 2', () => {
    const inputFile = path.join('day1', 'input2.sample.txt')
    const expectedOutput = 281

    expect(sumAllCalibrationValues(inputFile, getSingleAndLetterDigits)).toBe(expectedOutput)
})

test('Test sumAllCalibrationValues input 2', () => {
    const inputFile = path.join('day1', 'input.txt')
    const expectedOutput = 54076

    expect(sumAllCalibrationValues(inputFile, getSingleAndLetterDigits)).toBe(expectedOutput)
})