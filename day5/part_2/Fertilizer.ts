import * as fs from 'fs'

const filePath = '../input.txt'


function Fertilizer(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list = content.trim().split('\n')
    const [_, seeds] = list[0].split(':')
    const seedList = seeds.trim().split(' ').map(item => item.replace(/\r?\n|\r/g, ""))

    const seven = [['']]
    let index = -1

    for (let i = 2;i < list.length;i++) {
        if (!list[i].trim()) continue
        if (list[i].match(/^[0-9\s]*$/)) {
            seven[index].push(list[i].replace(/\r?\n|\r/g, ""))
        } else {
            index++
            seven[index] = []
        }
    }
    let sol = getMinValue(seedList, seven)
    return sol
}



function getMinValue(seedList: string[], seven: string[][]) {
    let pairs = []
    for (let i = 0;i < seedList.length;i += 2) {
        pairs.push([Number(seedList[i]), (Number(seedList[i]) + Number(seedList[i + 1]) - 1)])
    }
    let sum = -1
    for (let i = 0;i < Number.MAX_VALUE;i++) {
        let value = i
        for (let k = seven.length - 1;k >= 0;k--) {
            for (let l = 0;l < seven[k].length;l++) { // cada linea de un grupo
                const [dest, source, length] = seven[k][l].split(' ')
                const end = (Number(source) + Number(length)) - 1
                const diff = Number(dest) - Number(source)
                if (Number(source) <= (value - diff) && (value - diff) <= end) {
                    value += Number(source) - Number(dest)
                    break
                }
            }

        }
        if (pairs.some(r => r[0] <= value && value <= r[1])) {
            sum = i
            break
        }
    }

    return sum

}


console.log(Fertilizer(filePath))

