import * as fs from 'fs'

const filePath = '../input.txt'

function Lava(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list = content.trim().split('\n')
    const rows = list.map(line => line.trim().split(''))
    return move(rows)
}

function move(rows: string[][]): number {
    let energized: string[][] = Array(rows.length).fill(0).map(() => Array(rows[0].length).fill('.'))
    const turn = [[-1, 0], [0, 1], [1, 0], [0, -1]]
    const map = new Map<string, boolean>()
    const queue = [{ row: 0, col: 0, dir: 1 }]
    while (queue.length > 0) {
        const { row, col, dir } = queue.pop()!
        const key = [row, col, dir].join(',')
        if (map.has(key)) continue
        map.set(key, true)
        if (row >= 0 && row < rows.length && col >= 0 && col < rows[0].length) {
            const directions = []
            energized[row][col] = '#'
            if (rows[row][col] === '|') {
                (dir % 2 === 1) ? directions.push(0, 2) : directions.push(dir)

            } else
                if (rows[row][col] === '-') {
                    (dir % 2 === 0) ? directions.push(1, 3) : directions.push(dir)

                } else
                    if (rows[row][col] === '\\') {
                        directions.push(dir ^ 3)

                    } else
                        if (rows[row][col] === '/') {
                            directions.push(dir ^ 1)

                        } else directions.push(dir)

            for (let d of directions) {
                queue.push({ row: row + turn[d][0], col: col + turn[d][1], dir: d })
            }

        }
    }
    return energized.flat().filter(c => c === '#').length
}

console.log(Lava(filePath))

