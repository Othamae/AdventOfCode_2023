import * as fs from 'fs'

const filePath = '../input.txt'

function ClumsyCrucible(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list = content.trim().split('\n')
    const rows = list.map(line => line.trim().split('').map(cell => parseInt(cell)))
    return heatLoss(rows)

}

function heatLoss(rows: number[][]) {
    const graph: { [key: string]: { heat: number, path: { [key: string]: number } } } = {}
    let result = Infinity
    for (let y = 0;y < rows.length;y++) {
        for (let x = 0;x < rows[y].length;x++) {
            const vertical: { heat: number, path: { [key: string]: number } } = { heat: Infinity, path: {} }
            graph[`v(${x},${y})`] = vertical
            const horizontal: { heat: number, path: { [key: string]: number } } = { heat: Infinity, path: {} }
            graph[`h(${x},${y})`] = horizontal


            for (let i = 4;i <= 10;i++) {
                if ((x + i) >= 0 && (x + i) < rows[i].length) {
                    horizontal.path[`v(${x + i},${y})`] = Array(i).fill(0).reduce((a, _, j) => a + rows[y][x + 1 + j], 0)
                }
                if ((x - i) >= 0 && (x - i) < rows[i].length) {
                    horizontal.path[`v(${x - i},${y})`] = Array(i).fill(0).reduce((a, _, j) => a + rows[y][x - 1 - j], 0)
                }
                if ((y + i) >= 0 && (y + i) < rows.length) {
                    vertical.path[`h(${x},${y + i})`] = Array(i).fill(0).reduce((a, _, j) => a + rows[y + 1 + j][x], 0)
                }
                if ((y - i) >= 0 && (y - i) < rows.length) {
                    vertical.path[`h(${x},${y - i})`] = Array(i).fill(0).reduce((a, _, j) => a + rows[y - 1 - j][x], 0)
                }
            }

        }
    }

    const start = { ...graph['h(0,0)'].path, ...graph['v(0,0)'].path }

    for (const key in start) {
        move(key, start[key])
    }
    function move(key: string, heat: number) {
        if (heat >= Math.min(graph[key].heat, result)) return
        const coord = key.slice(1)
        if (coord === `(${rows[0].length - 1},${rows.length - 1})`) {
            result = heat
            return
        }
        graph[key].heat = heat
        const newPath = graph[key].path
        for (const newKey in newPath) {
            move(newKey, heat + graph[key].path[newKey])
        }
    }

    return result
}


console.log(ClumsyCrucible(filePath))
