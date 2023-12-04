import * as fs from 'fs'

const filePath = '../input.txt'


function sumPossibleIDs(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list: string[] = content.trim().split('\n')
    let sum = 0
    for (let code of list) {
        const [gameNumber, games] = code.split(':')
        const [_, index] = gameNumber.split(' ')
        if (isPosible(games.replace(/\r/g, ''))) {
            sum += Number(index)
        }
    }
    return sum
}

type CubeColors = 'red' | 'green' | 'blue'
const cubes: Record<CubeColors, number> = {
    red: 12,
    green: 13,
    blue: 14
}
function isPosible(games: string) {
    const gamesArray = games.split(';')
    console.log({ games })
    for (let game of gamesArray) {
        const cubeSets = game.split(',')
        for (let i = 0;i < cubeSets.length;i++) {
            const [_, number, color] = cubeSets[i].split(' ')
            if (color in cubes && cubes[color as CubeColors] < Number(number)) {
                return false
            }
        }

    }
    return true

}

console.log(sumPossibleIDs(filePath))

