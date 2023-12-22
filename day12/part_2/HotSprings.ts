import * as fs from 'fs'

const filePath = '../input.txt'


function HotSprings(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list = content.trim().split('\n')
    let totalArr = 0
    const cache: { [key: string]: number } = {}

    function getArrangements(springs: string, group: number[]): number {
        const line = springs + ' ' + group.join(',')
        if (cache[line]) return cache[line]
        if (group.length <= 0) return Number(!springs.includes('#'))
        const totalGroup = group.reduce((a, b) => a + b)
        if (springs.length - totalGroup - group.length + 1 < 0) return 0
        const unknown = !springs.slice(0, group[0]).includes(".")
        if (springs.length === group[0]) return Number(unknown)
        return cache[line] ??= (springs[0] != '#' ? getArrangements(trimStart(springs.slice(1)), group) : 0)
            + (unknown && springs[group[0]] != '#' ? getArrangements(trimStart(springs.slice(group[0] + 1)), group.slice(1)) : 0)

    }
    function trimStart(str: string) {
        return str.startsWith(".") ? str.split(/(?<=\.)(?=[^.])/).slice(1).join("") : str
    }
    for (const line of list) {
        const [springs, groupStr] = line.split(' ')
        const group = groupStr.split(',').map(x => Number(x))
        totalArr += getArrangements(Array(5).fill(springs).join("?") as string, Array(5).fill(group).flat() as number[])

    }
    return totalArr
}



console.log(HotSprings(filePath))

