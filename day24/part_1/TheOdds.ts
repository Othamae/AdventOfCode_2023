import * as fs from 'fs'

const filePath = '../input.txt'


function TheOdds(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list = content.trim().split('\n')
    const rows = list.map(line => line.trim().split('@')).map(line => line.map(x => x.trim()))
    return getIntersections(rows)
}

function getIntersections(rows: string[][]) {
    let counter = 0
    const max = 400000000000000
    const min = 200000000000000
    for (let i = 0;i < rows.length;i++) {
        const [[x, y, z], [vx, vy, vz]] = getValues(rows[i])
        const m: number = vy / vx
        const n = y - m * x
        for (let j = i + 1;j < rows.length;j++) {
            const [[x2, y2, z2], [vx2, vy2, vz2]] = getValues(rows[j])
            const m2 = vy2 / vx2
            const n2 = y2 - m2 * x2
            const intersX = (n2 - n) / (m - m2)
            const intersY = m * intersX + n
            if (isValid(intersX, intersY, x, y, x2, y2, max, min, vx, vy, vx2, vy2)) counter++
        }
    }
    return counter
}

function getValues(row: string[]) {
    const [coord, velocity] = row
    const [x, y, z] = coord.split(',').map(x => parseInt(x))
    const [vx, vy, vz] = velocity.split(',').map(x => parseInt(x))
    return [[x, y, z], [vx, vy, vz]]
}

function isValid(x: number, y: number, x1: number, y1: number, x2: number, y2: number, max: number, min: number, vx1: number, vy1: number, vx2: number, vy2: number) {
    const checkDirection = (v: number, x: number, inters: number) => {
        return v > 0 ? inters > x + v : inters < x + v
    }
    const isFuture = checkDirection(vx1, x1, x) && checkDirection(vx2, x2, x) && checkDirection(vy1, y1, y) && checkDirection(vy2, y2, y)
    const insideArea = x < max && x > min && y < max && y > min
    return insideArea && isFuture
}


console.log(TheOdds(filePath))
