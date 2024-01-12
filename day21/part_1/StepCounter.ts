import * as fs from 'fs'

const filePath = '../input.txt'


function StepCounter(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list = content.trim().split('\n')
    const rows = list.map(line => line.trim().split(''))
    return calculatePlots(rows)
}

function calculatePlots(rows: string[][]) {
    let steps = 63
    const start = getStartPoint(rows)
    const x = start[0]
    const y = start[1]
    rows = addPlot(rows, x, y)
    while (steps > 0) {
        const listOfPlots = getListOfPlots(rows)
        for (let i = 0;i < listOfPlots.length;i++) {
            rows = addPlot(rows, listOfPlots[i][0], listOfPlots[i][1])
        }
        steps--
    }
    const plots = rows.map(row => row.filter(l => l === 'O')).filter(row => row.length > 0).reduce((a, b) => a + b.length, 0)
    return plots
}

function getStartPoint(rows: string[][]): [number, number] {
    for (let y = 0;y < rows.length;y++) {
        for (let x = 0;x < rows[y].length;x++) {
            if (rows[y][x] === 'S') {
                return [x, y]
            }
        }
    }
    return [-1, -1]
}

function getListOfPlots(rows: string[][]): number[][] {
    const listOfPlots = []
    for (let y = 0;y < rows.length;y++) {
        for (let x = 0;x < rows[y].length;x++) {
            if (rows[y][x] === 'O') {
                listOfPlots.push([x, y])
            }
        }
    }
    return listOfPlots
}

function addPlot(rows: string[][], x: number, y: number) {
    if (x > 0 && x < rows[0].length - 1) {
        if (rows[y][x - 1] === '.' || rows[y][x - 1] === 'S') rows[y][x - 1] = 'O'
        if (rows[y][x + 1] === '.' || rows[y][x + 1] === 'S') rows[y][x + 1] = 'O'
    }
    if (y > 0 && y < rows[0].length - 1) {
        if (rows[y - 1][x] === '.' || rows[y - 1][x] === 'S') rows[y - 1][x] = 'O'
        if (rows[y + 1][x] === '.' || rows[y + 1][x] === 'S') rows[y + 1][x] = 'O'
    }
    rows[y][x] = '.'
    return rows
}

console.log(StepCounter(filePath))

