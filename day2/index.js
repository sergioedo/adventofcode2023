import fs from 'fs'

const bagCubes = {
    red: 12,
    green: 13,
    blue: 14
}

const isGamePossible = (cubesShows, bagCubes) => {
    return cubesShows.every(cubesShow => {
        return (cubesShow.red || 0) <= bagCubes.red && (cubesShow.green || 0) <= bagCubes.green && (cubesShow.blue || 0) <= bagCubes.blue
    })
}

const readGame = (line) => {
    const gameId = Number(line.split(':')[0].split(' ')[1])
    const cubesShows = line.split(':')[1].split(';').map(cubesShow => {
        return cubesShow.split(',').reduce((prev, line) => {
            const quantity = Number(line.trim().split(' ')[0].trim())
            const color = line.trim().split(' ')[1].trim()
            return {
                ...prev,
                [color]: quantity
            }
        }, {})
    })
    return { gameId, cubesShows }
}

export const possibleGames = (inputFile) => {
    const input = fs.readFileSync(inputFile, { encoding: 'UTF-8' }).split('\n')

    return input.reduce((counter, currLine) => {
        const { gameId, cubesShows } = readGame(currLine)
        const isPossible = isGamePossible(cubesShows, bagCubes);
        return isPossible ? counter + gameId : counter
    }, 0)
}

const minimumGameCubes = (cubesShows) => {
    return cubesShows.reduce((prev, curr) => {
        return {
            ...prev,
            red: Math.max(prev.red, curr.red || 0),
            green: Math.max(prev.green, curr.green || 0),
            blue: Math.max(prev.blue, curr.blue || 0),
        }
    }, { red: 0, green: 0, blue: 0 })
}

export const powerMinimumGameCubes = (inputFile) => {
    const input = fs.readFileSync(inputFile, { encoding: 'UTF-8' }).split('\n')

    return input.reduce((counter, currLine) => {
        const { gameId, cubesShows } = readGame(currLine)
        const minGamecubes = minimumGameCubes(cubesShows);
        return counter + (minGamecubes.red * minGamecubes.blue * minGamecubes.green)
    }, 0)
}