import * as fs from 'fs'

const filePath = '../input.txt'


function LongWalk(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list = content.trim().split('\n')
    const rows = list.map(line => line.trim().split(''))
    return getSteps(rows)
}

function getSteps(rows: string[][]) {
    let steps = 1
    const visitedPos: Visited = { "1,0^": new Set(["1,0"]) }
    const neighbors = addNeighboors(rows)
    steps = move(new Set(["1,0"]), 1, 1, `v`, rows, steps, neighbors, visitedPos)
    return steps
}

function addNeighboors(rows: string[][]): Neighbor {
    const neighbors: Neighbor = { "1,0": [[1, 1, '']] }
    neighbors[[rows[0].length - 2, rows.length - 1].join(",")] = [[rows[0].length - 2, rows.length - 2, '']]
    for (let y = 1;y < rows.length - 1;y++) {
        for (let x = 1;x < rows[y].length - 1;x++) {
            if (rows[y][x] === "#") continue
            const neighbor: [number, number, string][] = []
            if (rows[y + 1][x] !== "#") neighbor.push([x, y + 1, "v"])
            if (rows[y][x + 1] !== "#") neighbor.push([x + 1, y, ">"])
            if (rows[y - 1][x] !== "#") neighbor.push([x, y - 1, '^'])
            if (rows[y][x - 1] !== "#") neighbor.push([x - 1, y, "<"])
            neighbors[[x, y].join(',')] = neighbor
        }
    }
    return neighbors
}

function move(visited: Set<string>, x: number, y: number, direction: string, rows: string[][], steps: number, neighbors: Neighbor, visitedPos: Visited): number {
    const rowLength = rows.length
    const colLength = rows[0].length
    if (x === colLength - 2 && y === rowLength - 1) return Math.max(steps, visited.size)
    const key = x + ',' + y + direction
    if (!Array.isArray(neighbors[[x, y].join(',')][0]) && key in visitedPos && [...visited].every(v => visitedPos[key].has(v))) return steps
    if (['<>', '><', 'v^', '^v'].includes(direction + rows[y][x])) return steps
    visited.add(x + ',' + y)
    visitedPos[key] = new Set(visited)
    for (const [coorX, coorY, dir] of neighbors[[x, y].join(',')]) {
        if (!visited.has([coorX, coorY].join(","))) steps = move(new Set(visited), coorX, coorY, dir, rows, steps, neighbors, visitedPos)
    }
    return steps
}

type Visited = Record<string, Set<string>>
type Neighbor = Record<string, [number, number, string][]>

console.log(LongWalk(filePath))

