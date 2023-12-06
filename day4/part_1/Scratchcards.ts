import * as fs from 'fs'

const filePath = '../input.txt'
function Scratchcards(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list: string[] = content.trim().split('\n')
    let sum = 0
    for (let i = 0;i < list.length;i++) {
        const [_, code] = list[i].trim().split(':')
        const [winners, yourNumbers] = code.trim().split('|')
        const winnerList = winners.trim().split(' ').filter(item => item)
        const winnersYouHave = yourNumbers.trim().split(' ').filter(num => winnerList.includes(num))
        console.log({ winnersYouHave })
        if (winnersYouHave.length > 0) sum += points(winnersYouHave.length)

    }
    return sum
}

function points(amount: number): number {
    if (amount === 1) return 1
    return 2 * points(amount - 1)
}

console.log(Scratchcards(filePath))