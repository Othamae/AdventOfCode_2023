import * as fs from 'fs'

const filePath = '../input.txt'

let order = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
let valueOrder: { [key: string]: number } = {}
order.forEach((char, index) => {
    valueOrder[char] = index
})

function CamelCards(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list: string[] = content.trim().split('\n')
    const map = []
    for (let i = 0;i < list.length;i++) {
        const [card, bid] = list[i].split(' ').map(item => item.replace(/\r?\n|\r/g, ""))
        const type = getType(card) || 7
        map[type - 1] ? map[type - 1].push({ card, bid: Number(bid) }) : map[type - 1] = [{ card, bid: Number(bid) }]
        console.log({ card, bid })
    }
    const result = getRank(map)
    return result
}

console.log(CamelCards(filePath))



function getType(line: string) {
    const [card, bid] = line.split(' ').map(item => item.replace(/\r?\n|\r/g, ""))
    const map = new Map()
    for (let j = 0;j < card.length;j++) {
        map.get(card[j]) ? map.set(card[j], map.get(card[j]) + 1) : map.set(card[j], 1)
    }
    console.log(map.values())
    if (map.size === 1) return 1
    if (map.size === 4) return 6
    if (map.size === 5) return 7
    if (map.size === 2) {
        if (map.values().next().value === 4 || map.values().next().value === 1) return 2
        return 3
    }
    if (map.size === 3) {
        let val = 0
        map.forEach((el) => {
            if (el === 3) val = 4
            if (el === 2) val = 5
        })
        return val
    }
}

function getRank(map: {
    card: string
    bid: number
}[][]) {
    let counter = map.reduce((total, actual) => total + actual.length, 0)
    let sum = 0
    // Asign value to each card
    for (let i = 0;i < map.length;i++) {
        if (!map[i]) continue
        console.log(map[i])
        // sort cards for this group
        map[i].sort((a, b) => compare(a.card, b.card))

        // asign total value to each card 
        for (let j = 0;j < map[i].length;j++) {
            map[i][j].bid *= counter
            counter--
            sum += map[i][j].bid
        }
    }
    return sum
}

function compare(a: string, b: string): number {
    for (let i = 0;i < Math.min(a.length, b.length);i++) {
        if (a[i] !== b[i]) {
            return valueOrder[a[i]] - valueOrder[b[i]]
        }
    }
    return a.length - b.length
}
