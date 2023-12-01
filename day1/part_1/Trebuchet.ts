import * as fs from 'fs'

const filePath = '../input.txt'

function calibration(filePath: string): number {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list: string[] = content.trim().split('\n')

    let sum = 0
    for (let code of list) {
        const nums = code.replace(/[^0-9]/g, '')
        nums && (
            sum += nums.length === 1
                ? Number(nums[0] + nums[0])
                : Number(nums[0] + nums[nums.length - 1])
        )
    }
    return sum
}

const solution = calibration(filePath)
console.log(solution)
