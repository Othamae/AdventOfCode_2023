import * as fs from 'fs'

const filePath = '../input.txt'

function gearRatios(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list: string[] = content.trim().split('\n')
    let sum = 0
    for (let i = 0;i < list.length;i++) {
        const array = list[i].split('')
        let num = ''
        let firstIndex = null
        for (let j = 0;j < array.length;j++) {
            if (array[j] !== '.' && !Number.isNaN(Number(array[j]))) {
                num += array[j]
                firstIndex === null && (firstIndex = j)
            } else if (num !== '') {
                hasSymbol(Number(num), i, j, list) && (sum += Number(num))
                num = ''
            }
        }
        if (num !== '') {
            hasSymbol(Number(num), i, array.length - 1, list) && (sum += Number(num))
        }
    }
    return sum
}

function hasSymbol(num: number, i: number, j: number, list: string[]) {
    const numRows = list.length
    const numCols = list[0].length
    const firstIndex = j - num.toString().length
    for (let row = Math.max(0, i - 1);row <= Math.min(numRows - 1, i + 1);row++) {
        for (let col = Math.max(0, firstIndex - 1);col <= Math.min(numCols - 1, j);col++) {
            const currentChar = list[row][col]
            if (currentChar !== '.' && Number.isNaN(Number(currentChar))) {
                return true
            }
        }
    }
    return false
}

console.log(gearRatios(filePath))