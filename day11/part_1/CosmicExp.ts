import * as fs from 'fs'

const filePath = '../input.txt'


function CosmicExp(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list: string[] = content.trim().split('\n')
    const expanded = getFinalExpansion(list)
    const [renamed, totalGalaxy] = rename(expanded)

    return getPath(renamed, 1, totalGalaxy, 0)

}

function getFinalExpansion(list: string[]): string[][] {
    const horizontal: string[][] = expansion(list)
    const vertical: string[] = transpose(horizontal)
    const expanded: string[][] = expansion(vertical)
    const result = transpose(expanded)
    return result.map(line => line.trim().split(''))
}

function expansion(list: string[]): string[][] {
    const result = []
    for (let i = 0;i < list.length;i++) {
        result.push(list[i].split(''))
        if (!list[i].includes('#')) {
            result.push(list[i].split(''))
        }
    }
    return result
}

function transpose(list: string[][]) {
    return list[0].map((_, i) => list.map(row => row[i]).join(''))
}

function rename(list: string[][]): [string[][], number] {
    let number = 1
    return [list.map((line, row) => line.map((ch, col) => {
        if (ch === '#') {
            ch = number.toString()
            number++
        }
        return ch
    })), number]
}

function getPath(map: string[][], galaxy: number, totalGalaxy: number, sum: number) {
    if (galaxy === totalGalaxy) return sum
    let currentPosition: [number, number] = [0, 0]
    let next = galaxy + 1
    while (next < totalGalaxy) {
        let nextPosition: [number, number] = [0, 0]
        map.forEach((line, row) => line.forEach((ch, col) => {
            if (ch === galaxy.toString()) {
                currentPosition = [row, col]
            }
            if (ch === next.toString()) {
                nextPosition = [row, col]
            }
        }))

        const steps = Math.abs(currentPosition[0] - nextPosition[0]) + Math.abs(currentPosition[1] - nextPosition[1])
        sum += steps
        next++
    }

    return getPath(map, galaxy + 1, totalGalaxy, sum)
}
console.log(CosmicExp(filePath))