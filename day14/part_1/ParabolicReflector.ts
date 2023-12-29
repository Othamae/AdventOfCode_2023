import * as fs from 'fs'

const filePath = '../input.txt'


function ParabolicReflector(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list = content.trim().split('\n')
    const rows = list.map(row => row.trim().split(''))
    const columns = rows[0].map((_, i) => rows.map(row => row[i]))
    const rocks = moveRocks(columns)
    return calculateLoad(rocks)

}


function moveRocks(columns: string[][]) {
    for (let i = 0;i < columns.length;i++) {
        for (let j = 0;j < columns[i].length;j++)
            if (columns[i][j] === 'O') {
                columns[i] = moveARock(columns[i], j)
            }
    }
    return columns[0].map((_, i) => columns.map(row => row[i]))
}

function moveARock(column: string[], j: number) {
    while (j > 0) {
        if (column[j - 1] != '.') break
        column[j - 1] = 'O'
        column[j] = '.'
        j--
    }
    return column
}

function calculateLoad(rocks: string[][]) {
    let load = 0
    for (let i = 0;i < rocks.length;i++) {
        const amountRocks = rocks[i].filter(rock => rock === 'O').length
        load += amountRocks * (rocks.length - i)
    }
    return load
}

console.log(ParabolicReflector(filePath))

