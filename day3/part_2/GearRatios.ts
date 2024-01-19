import * as fs from 'fs'

const filePath = '../input.txt'

function gearRatios(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list: string[] = content.trim().split('\n')
    const grid = list.map(line => line.split(''))
    const listOfNumbers: Record<string, number[]> = {}
    for (let y = 0;y < grid.length;y++) {
        let num = ''
        let checkNumber = false
        let location = null

        for (let x = 0;x < grid[y].length;x++) {
            if (grid[y][x].match(/[0-9]/) && !checkNumber) {
                checkNumber = true
                num = ''
                location = null
            }
            if ((x == grid[y].length - 1 || !grid[y][x].match(/[0-9]/)) && checkNumber) {
                if (location) listOfNumbers[location].push(parseInt(num + ((grid[y][x].match(/[0-9]/)) ? grid[y][x] : '')))
                checkNumber = false
            }

            if (checkNumber) {
                num += grid[y][x]

                for (let j = -1;j <= 1;j++) {
                    for (let i = -1;i <= 1;i++) {
                        if (i == 0 && j == 0) continue
                        if (y + j < 0 || y + j >= grid.length || x + i < 0 || x + i >= grid[y].length) continue

                        const char = grid[y + j][x + i]
                        if (char == '*') {
                            location = `${x + i},${y + j}`
                            if (listOfNumbers[location] == null) listOfNumbers[location] = []
                        }
                    }
                }
            }
        }
    }
    return Object.values(listOfNumbers).reduce((sum, array) => {
        if (array.length == 2) sum += array[0] * array[1]
        return sum
    }, 0)
}

console.log(gearRatios(filePath))