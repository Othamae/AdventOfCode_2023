import * as fs from 'fs'

const filePath = '../input.txt'

enum DIRECTION {
    NORTH,
    EAST,
    SOUTH,
    WEST
};

const DIFFS = {
    [DIRECTION.NORTH]: [-1, 0],
    [DIRECTION.SOUTH]: [1, 0],
    [DIRECTION.WEST]: [0, -1],
    [DIRECTION.EAST]: [0, 1],
}

const DIRECTIONS = {
    '|': [DIRECTION.NORTH, DIRECTION.SOUTH],
    '-': [DIRECTION.WEST, DIRECTION.EAST],
    'L': [DIRECTION.NORTH, DIRECTION.EAST],
    'J': [DIRECTION.NORTH, DIRECTION.WEST],
    '7': [DIRECTION.WEST, DIRECTION.SOUTH],
    'F': [DIRECTION.EAST, DIRECTION.SOUTH],
    'S': [DIRECTION.NORTH, DIRECTION.SOUTH, DIRECTION.EAST, DIRECTION.WEST]
}

const VALID = {
    [DIRECTION.NORTH]: ['|', '7', 'F'],
    [DIRECTION.SOUTH]: ['|', 'L', 'J'],
    [DIRECTION.WEST]: ['-', 'L', 'F'],
    [DIRECTION.EAST]: ['-', 'J', '7']
}

function PipeMaze(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list: string[] = content.trim().split('\n')
    const maze = list.map(line => line.trim().split(''))
    console.log(maze)
    let startPosition: [number, number] = [0, 0]
    maze.forEach((line, row) => line.forEach((ch, col) => {
        if (ch === 'S') {
            startPosition = [row, col]
        }
    }))

    const queue: [[number, number], number][] = [[startPosition, 0]]
    const visited = new Set()
    const finalDistances = new Map()

    let [minRow, maxRow] = [Infinity, -Infinity]
    let [minCol, maxCol] = [Infinity, -Infinity]

    while (queue.length > 0) {
        const [[row, col], dist] = queue.shift()!
        if (row < minRow) minRow = row
        if (row > maxRow) maxRow = row
        if (col < minCol) minCol = col
        if (col > maxCol) maxCol = col
        const key = JSON.stringify([row, col])
        const minDist = finalDistances.has(key) ? Math.min(finalDistances.get(key), dist) : dist
        finalDistances.set(key, minDist)
        if (visited.has(key)) continue
        visited.add(key)
        const cur = maze[row][col] as keyof typeof DIRECTIONS
        const next = (DIRECTIONS[cur]).filter((d) => {
            const [dy, dx] = DIFFS[d]
            const nextY = row + dy
            const nextX = col + dx
            const nextChar = maze[nextY][nextX]
            if (nextY < 0 || nextY >= maze.length) return false
            if (nextX < 0 || nextX >= maze[0].length) return false
            return VALID[d].includes(nextChar)
        }).map((d) => {
            const [dy, dx] = DIFFS[d]
            const nextY = row + dy
            const nextX = col + dx
            return [nextY, nextX]
        })
        queue.push(...next.map(n => [n, dist + 1]) as typeof queue)
    }

    return Math.max(...finalDistances.values())

}

console.log(PipeMaze(filePath))


