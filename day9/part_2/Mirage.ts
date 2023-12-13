import * as fs from 'fs'

const filePath = '../input.txt'

function Mirage(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list: string[] = content.trim().split('\n')
    let sum = 0
    for (let i = 0;i < list.length;i++) {
        const line = list[i].trim().split(' ').map(num => Number(num))
        const seq = getSequence(line, [line[0]])
        sum += getPreviousValue(seq)
    }
    return sum

}

console.log(Mirage(filePath))

function getSequence(line: number[], sequences: number[]) {
    if (line.every(num => num === 0)) return sequences
    const nextLine = []
    for (let i = 0;i < line.length - 1;i++) {
        nextLine.push(line[i + 1] - line[i])
    }
    sequences.push(nextLine[0])
    console.log(sequences)
    return getSequence(nextLine, sequences)

}

function getPreviousValue(sequence: number[]) {
    let value = 0
    for (let i = sequence.length - 1;i >= 0;i--) {
        const x = sequence[i] - value
        value = x
    }
    return value
}
