import { expect, test } from 'vitest'
import { possibleGames } from 'day2'
import path from 'path'

test('Test possibleGames sample input', () => {
    const inputFile = path.join('day2', 'input.sample.txt')
    const expectedOutput = 8

    expect(possibleGames(inputFile)).toBe(expectedOutput)
})

test('Test possibleGames input', () => {
    const inputFile = path.join('day2', 'input.txt')
    const expectedOutput = 2348

    expect(possibleGames(inputFile)).toBe(expectedOutput)
})