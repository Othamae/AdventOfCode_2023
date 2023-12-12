import * as fs from 'fs'

const filePath = '../input.txt'

function Wasteland(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list: string[] = content.trim().split('\n')
    const directions = list[0].trim()
    const listOfMap = list.slice(2)
    const map = createMap(listOfMap)
    let startList = [...map.keys()].filter(k => k.endsWith('A'))
    let counter = 0
    let paths = startList.map(_ => 0)
    while (!paths.every(p => p !== 0)) {
        startList = startList.map(key => map.get(key)![directions[counter % directions.length] === 'R' ? 1 : 0])
        startList.forEach((key, i) => {
            if (key.endsWith('Z') && paths[i] === 0) paths[i] = counter
        })
        counter++
    }
    paths = paths.map(p => p + 1)

    return lcmm(paths)

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


function gcd(a: number, b: number): number {
    while (b != 0) {
        let t = b
        b = a % b
        a = t
    }
    return a
}

function lcm(a: number, b: number): number {
    return (!a || !b) ? 0 : Math.abs((a * b) / gcd(a, b))
}

function lcmm(nums: number[]): number {
    let res = nums[0]
    for (let i = 1;i < nums.length;i++) {
        res = lcm(res, nums[i])
    }
    return res
}
