import * as fs from 'fs'

const filePath = '../input.txt'


function ParabolicReflector(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list = content.trim().split('\n')
    const rows = list.map(row => row.trim().split(''))
    return getFinalLoad(rows)

}


function calculateLoad(rocks: string[][]) {
    let load = 0
    for (let i = 0;i < rocks.length;i++) {
        const amountRocks = rocks[i].filter(rock => rock === 'O').length
        load += amountRocks * (rocks.length - i)
    }
    return load
}


function doTheCycle(rows: string[][]) {
    return moveRocksEast(moveRocksSouth(moveRocksWest(moveRocksNorth(rows))))
}

function moveRocksNorth(rows: string[][]) {
    const columns = rows[0].map((_, i) => rows.map(row => row[i]))
    for (let i = 0;i < columns.length;i++) {
        for (let j = 0;j < columns[i].length;j++)
            if (columns[i][j] === 'O') {
                columns[i] = moveUp(columns[i], j)
            }
    }
    return columns[0].map((_, i) => columns.map(row => row[i]))
}

function moveRocksSouth(rows: string[][]) {
    const columns = rows[0].map((_, i) => rows.map(row => row[i]))
    for (let i = 0;i < columns.length;i++) {
        for (let j = columns[i].length - 1;j >= 0;j--)
            if (columns[i][j] === 'O') {
                columns[i] = moveDown(columns[i], j)
            }
    }
    return columns[0].map((_, i) => columns.map(row => row[i]))
}

function moveRocksWest(rows: string[][]) {
    for (let i = 0;i < rows.length;i++) {
        for (let j = 0;j < rows[i].length;j++)
            if (rows[i][j] === 'O') {
                rows[i] = moveUp(rows[i], j)
            }
    }
    return rows
}

function moveRocksEast(rows: string[][]) {
    for (let i = 0;i < rows.length;i++) {
        for (let j = rows[i].length - 1;j >= 0;j--)
            if (rows[i][j] === 'O') {
                rows[i] = moveDown(rows[i], j)
            }
    }
    return rows
}


function moveUp(row: string[], j: number) {
    while (j > 0) {
        if (row[j - 1] != '.') break
        row[j - 1] = 'O'
        row[j] = '.'
        j--
    }
    return row
}

function moveDown(row: string[], j: number) {
    while (j < row.length) {
        if (row[j + 1] != '.') break
        row[j + 1] = 'O'
        row[j] = '.'
        j++
    }
    return row
}


function getFinalLoad(rows: string[][]) {
    let sol = 0
    let cycled = rows
    const calculateMap = new Map()
    const indexMap = new Map()
    for (let i = 0;i < 1000000000;i++) {
        cycled = doTheCycle(cycled)
        const key = cycled.map(row => row.join('')).join('')
        if (indexMap.has(key)) {
            const index = indexMap.get(key)
            const cycleLength = i - index
            const finalGrid = calculateMap.get((1000000000 - index - 1) % cycleLength + index)
            sol = calculateLoad(finalGrid)
            break
        }
        indexMap.set(key, i)
        calculateMap.set(i, structuredClone(cycled))
    }
    return sol
}

console.log(ParabolicReflector(filePath))
