import * as fs from 'fs'

const filePath = '../input.txt'

function Scratchcards(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list: string[] = content.trim().split('\n')
    let sum = 0
    const map = new Map<string, number>()
    for (let i = 0;i < list.length;i++) {
        const [card, code] = list[i].trim().split(':')
        const [winners, yourNumbers] = code.trim().split('|')
        const winnerList = winners.trim().split(' ').filter(num => num !== '' && num !== ' ')
        const winnersYouHave = yourNumbers.trim().split(' ').filter(num => winnerList.includes(num)).filter(num => num !== '' && num !== ' ')
        map.set(card, map.get(card) ? map.get(card)! + 1 : 1)
        if (winnersYouHave.length > 0) {
            const currentCardCopies = map.get(card)
            for (let j = 1;j <= winnersYouHave.length;j++) {
                if (i + j < list.length) {
                    const nextCard = list[i + j].trim().split(':')[0]
                    const copies = map.get(card)!
                    map.has(nextCard) ? map.set(nextCard, map.get(nextCard)! + copies) : map.set(nextCard, currentCardCopies!)
                }
            }
        }

    }
    map.forEach((value, key) => { sum += value })
    return sum
}

console.log(Scratchcards(filePath))