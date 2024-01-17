import * as fs from 'fs'

const filePath = '../input.txt'


function LongWalk(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8').split("\n").map(x => x.trim())
    return getSteps(content)
}

function getSteps(content: string[]) {
    const rowLength = content.length
    const colLength = content[0].length
    let map = ["0,1", `${rowLength - 1},${colLength - 2}`]
    const pathList: Record<number, Record<number, number>> = []
    for (let i = 0;i < map.length;i++) {
        pathList[i] = {}
        const path = map[i].split(',').map(x => (+x))
        move(path[0], path[1], 0, -1, i)
    }

    function move(y: number, x: number, step: number, last: number, i: number) {
        if (!isValid(y, x, content)) return
        let valids = 0
        if (isValid(y - 1, x, content)) valids++
        if (isValid(y + 1, x, content)) valids++
        if (isValid(y, x - 1, content)) valids++
        if (isValid(y, x + 1, content)) valids++
        if (step > 0 && (valids > 2 || y < 1 || y >= content.length - 1)) {
            const position = [y, x].join(",")
            if (!map.includes(position)) map.push(position)
            pathList[i][map.indexOf(position)] = step
            return
        }
        if (last != 2 && y > 0) move(y - 1, x, step + 1, 0, i)
        if (last != 0 && y < content.length - 1) move(y + 1, x, step + 1, 2, i)
        if (last != 3) move(y, x - 1, step + 1, 1, i)
        if (last != 1) move(y, x + 1, step + 1, 3, i)
    }
    let longPath = []
    let maxStep = 0

    move2(0, 0, [])
    function move2(step: number, path: number, prev: number[]) {
        if (path == 1) {
            if (step > maxStep) {
                longPath = prev
                maxStep = step
            }
            return
        }
        prev.push(path)
        for (let target in pathList[path]) {
            if (prev.includes(+target)) continue
            let nprev = [...prev]
            move2(step + pathList[path][target], +target, nprev)
        }
    }
    return maxStep
}

function isValid(y: number, x: number, content: string[]): boolean {
    return !(y < 0 || y >= content.length || x < 0 || x >= content[0].length || content[y][x] == '#')
}



console.log(LongWalk(filePath))
