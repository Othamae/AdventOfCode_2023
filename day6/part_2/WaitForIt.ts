import * as fs from 'fs'

const filePath = '../input.txt'

function WaitForIt(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list: string[] = content.trim().split('\n')
    const time = getValues(list[0])
    const distance = getValues(list[1])
    return getNumberOfWays(time, distance)
}

console.log(WaitForIt(filePath))

function getValues(string: string) {
    const array = string.split(':')
    return array[1].trim().split(' ').filter(item => item).map(item => item.replace(/\r?\n|\r/g, "")).join('')
}

function getNumberOfWays(time: string, distance: string) {
    let ways = 0
    const max = Number(distance)
    const mov = Number(time)
    for (let j = 0;j < mov;j++) {
        let res = j * (mov - j)
        if (res > max) ways++
    }
    return ways
}
