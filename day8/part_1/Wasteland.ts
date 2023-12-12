import * as fs from 'fs'

const filePath = '../input.txt'

function Wasteland(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list: string[] = content.trim().split('\n')
    const directions = list[0].split('')
    const listOfMap = list.slice(2)
    const map = createMap(listOfMap)
    let start = 'AAA'
    let counter = 0
    let finished = false
    while (!finished) {
        for (let i = 0;i < directions.length - 1;i++) {
            const direction = directions[i]
            const next = direction === 'R' ? map.get(start)![1] : map.get(start)![0]
            if (next === 'ZZZ') {
                counter++
                finished = true
                break
            } else {
                start = next
                counter++
            }
        }
    }
    return counter


}

console.log(Wasteland(filePath))

function createMap(list: string[]) {
    const map = new Map<string, string[]>()
    for (let i = 0;i < list.length;i++) {
        const [node, elements] = list[i].trim().split(' = ')
        const [L, R] = elements.replace('(', '').replace(')', '').split(', ')
        map.set(node, [L, R])
    }
    return map
}

