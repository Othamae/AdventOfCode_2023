import * as fs from 'fs'

const filePath = '../input.txt'


function LensLibrary(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list = content.trim().split(',')
    return hashAlogarithm(list)
}

function hashAlogarithm(list: string[]) {
    let sum = 0
    list.forEach(str => {
        sum += getValue(str)
    })
    return sum
}

function getValue(string: string) {
    let value = 0
    for (let i = 0;i < string.length;i++) {
        value += string.charCodeAt(i)
        value *= 17
        value %= 256
    }
    return value
}

console.log(LensLibrary(filePath))

