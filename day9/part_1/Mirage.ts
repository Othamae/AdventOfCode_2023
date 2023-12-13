import * as fs from 'fs'

const filePath = '../input.txt'

function Mirage(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list: string[] = content.trim().split('\n')
    let sum = 0
    for (let i = 0;i < list.length;i++) {
        const line = list[i].trim().split(' ').map(num => Number(num))
        sum += getNextValue(line, [line[line.length - 1]])
    }
    return sum

}

console.log(Mirage(filePath))

function getNextValue(line: number[], sequences: number[]) {
    if (line.every(num => num === 0)) return sequences.reduce((a, b) => a + b)
    const nextLine = []
    for (let i = 0;i < line.length - 1;i++) {
        nextLine.push(line[i + 1] - line[i])
    }
    sequences.push(nextLine[nextLine.length - 1])
    return getNextValue(nextLine, sequences)

}
