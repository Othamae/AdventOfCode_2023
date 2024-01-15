import * as fs from 'fs'

const filePath = '../input.txt'


function SandSlabs(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list = content.trim().split('\n')
    const rows = list.map(line => line.trim().split('~'))
    const bricks = createMap(rows)
    return getDesintegratedBricks(bricks)
}

function createMap(rows: string[][]) {
    const map: Brick[] = []
    for (const row of rows) {
        const [start, end] = row
        const [x1, y1, z1] = start.split(',')
        const [x2, y2, z2] = end.split(',')
        const supportedBy = []
        let falling = true
        if (z1 === '1' || z2 === '1') {
            supportedBy.push(-1)
            falling = false
        }
        map.push({
            start: [Number(x1), Number(y1), Number(z1)],
            end: [Number(x2), Number(y2), Number(z2)],
            supports: [],
            supportedBy,
            falling
        })
    }
    return map
}

function getDesintegratedBricks(bricks: Brick[]) {
    while (true) {
        let lowestBrick = -1
        let lowestZ = Infinity
        for (let i = 0;i < bricks.length;i++) {
            const brick = bricks[i]
            if (!brick.falling) continue
            let minZ = Math.min(brick.start[2], brick.end[2])
            let z = minZ
            if (z > lowestZ) continue
            let supported = -1
            for (let j = 0;j < bricks.length;j++) {
                if (j === i) continue
                const brick2 = bricks[j]
                if (Math.max(brick2.start[2], brick2.end[2]) !== minZ - 1) continue
                if (overlap(brick, brick2)) {
                    supported = j
                    break
                }
            }
            if (supported === -1) {
                lowestZ = z
                lowestBrick = i
            } else {
                brick.falling = bricks[supported].falling
            }
        }
        if (lowestBrick === -1) break
        const brick = bricks[lowestBrick]
        let high = -1
        const bottom = Math.min(brick.start[2], brick.end[2])
        let highZ = 0
        for (let i = 0;i < bricks.length;i++) {
            if (i === lowestBrick) continue
            const brick2 = bricks[i]
            const maxZ = Math.max(brick2.start[2], brick2.end[2])
            if (maxZ >= bottom || maxZ <= highZ || !overlap(brick, brick2)) continue
            highZ = maxZ
            high = i
        }
        if (high === -1) {
            const down = bottom - 1
            brick.start[2] -= down
            brick.end[2] -= down
            brick.falling = false
            brick.supportedBy.push(-1)
        } else {
            const hightBrick = bricks[high]
            const hightButtom = Math.max(hightBrick.start[2], hightBrick.end[2])
            const down = bottom - hightButtom - 1
            brick.start[2] -= down
            brick.end[2] -= down
            brick.falling = hightBrick.falling
        }
    }
    bricks = addSupported(bricks)
    return calculateSaveBricks(bricks)
}

function overlap(brick1: Brick, brick2: Brick) {
    return (Math.min(brick1.start[0], brick1.end[0]) <= Math.max(brick2.start[0], brick2.end[0])
        && Math.max(brick1.start[0], brick1.end[0]) >= Math.min(brick2.start[0], brick2.end[0])
        && Math.min(brick1.start[1], brick1.end[1]) <= Math.max(brick2.start[1], brick2.end[1])
        && Math.max(brick1.start[1], brick1.end[1]) >= Math.min(brick2.start[1], brick2.end[1]))
}

function addSupported(bricks: Brick[]) {
    for (let i = 0;i < bricks.length;i++) {
        const brick = bricks[i]
        const maxZ = Math.max(brick.start[2], brick.end[2])
        for (let j = 0;j < bricks.length;j++) {
            if (i === j) continue
            const brick2 = bricks[j]
            if (Math.min(brick2.start[2], brick2.end[2]) !== maxZ + 1) continue
            if (!overlap(brick, brick2)) continue
            brick2.supportedBy.push(i)
            brick.supports.push(j)
        }
    }
    return bricks
}

function calculateSaveBricks(bricks: Brick[]) {
    let result = 0
    for (let brick of bricks) {
        let safe = true
        for (let b of brick.supports) {
            if (bricks[b].supportedBy.length <= 1) {
                safe = false
                break
            }
        }
        result += safe ? 1 : 0
    }
    return result
}

type Brick = {
    start: number[],
    end: number[],
    supports: number[],
    supportedBy: number[],
    falling: boolean
}
console.log(SandSlabs(filePath))
