import * as fs from 'fs'

const filePath = '../input.txt'

function LavaductLagoon(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list = content.trim().split('\n').map(line => line.trim())
    const map = createMap(list)
    return dig(map)

}

function createMap(list: string[]) {
    const map: { dir: string, steps: number, color: string }[] = []
    list.forEach(element => {
        const [dir, steps, color] = element.split(' ')
        map.push({ dir, steps: parseInt(steps), color: color.slice(1, -1) })
    })
    return map
}


function dig(map: { dir: string, steps: number, color: string }[]) {
    let x = 0
    let y = 0
    let edge = 0
    let corners = []
    let interior = 0
    for (let inst of map) {
        const { color } = inst
        const [steps, dir] = getCorrectInstructions(color)
        if (dir === 'R') x += steps
        if (dir === 'L') x -= steps
        if (dir === 'U') y -= steps
        if (dir === 'D') y += steps
        edge += steps
        corners.push([x, y])
    }
    for (let i = 0;i < corners.length - 1;i++) {
        interior += corners[i][0] * corners[i + 1][1] - corners[i][1] * corners[i + 1][0]
    }
    edge += interior
    const total = (edge / 2) + 1
    return total
}

const DIRECTIONS: { [key: string]: string } = {
    '0': 'R',
    '1': 'D',
    '2': 'L',
    '3': 'U'
}

function getCorrectInstructions(color: string): [number, string] {
    const dir = DIRECTIONS[color.slice(-1)]
    const hexa = color.slice(1, -1)
    const steps = parseInt(hexa, 16)
    return [steps, dir]
}

console.log(LavaductLagoon(filePath))

