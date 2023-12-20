import * as fs from 'fs'

const filePath = '../input.txt'


function CosmicExp(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list: string[][] = content.trim().split('\n').map(x => x.split(""))
    const rows = list.map(x => x.join(""))
    const cols = list[0].map((_, i) => list.map(row => row[i]).join(''))
    const [emptyRows, emptyColumns] = getEmptyRowsAndCols(rows, cols)
    const galaxies = getGalaxies(list, rows, cols, emptyRows, emptyColumns)
    return getPath(galaxies)

}

function getEmptyRowsAndCols(rows: string[], cols: string[]) {
    const emptyRows = rows.map((_, i) => i).filter(x => !rows[x].includes("#"))
    const emptyColumns = cols.map((_, i) => i).filter(x => !cols[x].includes("#"))
    return [emptyRows, emptyColumns]
}

function getGalaxies(list: string[][], rows: string[], cols: string[], emptyRows: number[], emptyColumns: number[]) {
    const galaxies = []
    for (let i = 0;i < rows.length;i++) {
        for (let j = 0;j < cols.length;j++) {
            if (list[i][j] == "#") galaxies.push([i + emptyRows.filter(x => x < i).length * 999999, j + emptyColumns.filter(x => x < j).length * 999999])
        }
    }
    return galaxies
}

function getPath(galaxies: number[][]) {
    let result = 0
    for (let i = 0;i < galaxies.length;i++) {
        for (let j = i + 1;j < galaxies.length;j++) {
            result += Math.abs(galaxies[i][0] - galaxies[j][0]) + Math.abs(galaxies[i][1] - galaxies[j][1])
        }
    }
    return result
}

console.log(CosmicExp(filePath))
