import * as fs from 'fs'

const filePath = '../input.txt'
type CubeColors = 'red' | 'green' | 'blue'

function power(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list: string[] = content.trim().split('\n')
    let power = 0
    for (let code of list) {
        const [_, games] = code.split(':')
        power += minAmountColors(games.replace(/\r/g, ''))
    }
    return power
}


function minAmountColors(games: string) {
    const gamesArray = games.split(';')
    let min = {
        red: 0,
        green: 0,
        blue: 0
    }
    for (let game of gamesArray) {
        const cubeSets = game.split(',')
        for (let i = 0;i < cubeSets.length;i++) {
            const [_, number, color] = cubeSets[i].split(' ')
            if (min[color as CubeColors] === 0 || min[color as CubeColors] < Number(number)) {
                min[color as CubeColors] = Number(number)
            }
        }
    }
    return (min.red * min.blue * min.green)
}

console.log(power(filePath))

