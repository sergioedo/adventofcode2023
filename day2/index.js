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

export const possibleGames = (inputFile) => {
    const input = fs.readFileSync(inputFile, { encoding: 'UTF-8' }).split('\n')

    return input.reduce((prev, curr, currIdx, arr) => {
        const gameId = Number(curr.split(':')[0].split(' ')[1])
        const cubesShows = curr.split(':')[1].split(';').map(cubesShow => {
            return cubesShow.split(',').reduce((prev, curr) => {
                const quantity = Number(curr.trim().split(' ')[0].trim())
                const color = curr.trim().split(' ')[1].trim()
                return {
                    ...prev,
                    [color]: quantity
                }
            }, {})
        })
        const isPossible = isGamePossible(cubesShows, bagCubes);
        return isPossible ? prev + gameId : prev
    }, 0)
}