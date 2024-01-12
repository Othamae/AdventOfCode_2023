import * as fs from 'fs'

const filePath = '../input.txt'

function StepCounter(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list = content.trim().split('\n')
    const rows = list.map(line => line.trim().split(''))
    calculatePlots(rows)

}

function calculatePlots(rows: string[][]) {
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]
    const steps = 26501365 % rows.length

    const values: number[] = []
    const start = getStartPoint(rows)
    const rowLength = rows.length
    const colLength = rows[0].length
    for (let i = 0;i < 3;i++) {
        const queue = [start]
        let totalSteps = (steps + (rows.length * i))
        for (let j = 0;j < totalSteps;j++) {
            const localQueue = [...queue]
            const current = new Set(queue.map(x => x.join(",")))
            queue.splice(0, queue.length)

            while (localQueue.length > 0) {
                const element = localQueue.shift()
                for (const direction of directions) {
                    const x = element![0] + direction[0]
                    const y = element![1] + direction[1]
                    if (!current.has([x, y].join(",")) && rows[((y % rowLength) + rowLength) % rowLength][((x % colLength) + colLength) % colLength] != "#") {
                        current.add([x, y].join(","))
                        queue.push([x, y])
                    }
                }
            }
        }
        values.push(queue.length)
    }


    const a = Math.floor((values[2] - values[1] * 2 + values[0]) / 2)
    const b = values[1] - values[0] - 3 * a
    const c = values[0] - a - b
    const x = Math.ceil(26501365 / rows.length)

    return (a * x ** 2 + b * x + c)

}

function getStartPoint(rows: string[][]): [number, number] {
    for (let y = 0;y < rows.length;y++) {
        for (let x = 0;x < rows[y].length;x++) {
            if (rows[y][x] === 'S') {
                return [x, y]
            }
        }
    }
    return [-1, -1]
}

console.log(StepCounter(filePath))
