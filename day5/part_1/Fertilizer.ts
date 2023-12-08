import * as fs from 'fs'

const filePath = '../input.txt'

function Fertilizer(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list: string[] = content.trim().split('\n')
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

    return getMinValue(seedList, seven)
}


function getMinValue(seedList: string[], seven: string[][]) {
    let sol = []
    for (let i = 0;i < seedList.length;i++) { // each seed
        let value = Number(seedList[i])
        for (let j = 0;j < seven.length;j++) { // each group 
            for (let l = 0;l < seven[j].length;l++) { // each line
                const [dest, source, length] = seven[j][l].split(' ')

                if (Number(source) <= value && value < (Number(source) + Number(length))) {
                    value += Number(dest) - Number(source)
                    break
                }
            }
        }
        sol.push(value)

    }

    return sol.sort((a, b) => a - b)[0]
}


console.log(Fertilizer(filePath))

