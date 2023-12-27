import * as fs from 'fs'

const filePath = '../input.txt'


function Incidence(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list = content.trim().split('\n')
    const patterns = getPatterns(list)
    return summarizeNotes(patterns)

}

function getPatterns(list: string[]): string[][] {
    const patterns = []
    let patt: string[] = []
    for (let i = 0;i <= list.length - 1;i++) {
        if (list[i] === '\r') {
            patterns.push(patt)
            patt = []
            continue
        }
        patt.push(list[i].trim())
        i === list.length - 1 && patterns.push(patt)

    }
    return patterns
}


function summarizeNotes(patterns: string[][]) {
    let res = 0
    const rows: string[][] = []
    for (let i = 0;i < patterns.length;i++) {
        rows.push(transpose(patterns[i]))
        res += (getReflection(patterns[i]) * 100)
    }
    for (let i = 0;i < rows.length;i++) {
        res += getReflection(rows[i])
    }
    return res

}

function transpose(list: string[]) {
    let charArray = list.map(str => str.split(''))
    return charArray[0].map((_, i) => charArray.map(row => row[i])).map(charRow => charRow.join(''))
}


function getReflection(pattern: string[]) {
    const reflexion = []
    for (let col = 1;col < pattern.length;col++) {
        const diff: number[][] = []
        reflexion.push(col)
        for (let i = col - 1, j = col;i >= 0 && j < pattern.length;i--, j++) {
            if (pattern[i] !== pattern[j]) {
                diff.push([i, j])
            }
        }
        if (diff.length !== 1 || pattern[diff[0][0]].split("").map((x, i) => x !== pattern[diff[0][1]][i]).filter(x => x).length !== 1) {
            reflexion.splice(reflexion.length - 1, 1)
        }
    }
    return reflexion.length > 0 ? reflexion[0] : 0
}

console.log(Incidence(filePath))

