import * as fs from 'fs'

const filePath = '../input.txt'

function calibration(filePath: string): number {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list: string[] = content.trim().split('\n')

    let sum = 0
    for (let code of list) {
        const fixedCode = numbers(code)
        const nums = fixedCode.replace(/[^0-9]/g, '')
        nums && (
            sum += nums.length === 1
                ? Number(nums[0] + nums[0])
                : Number(nums[0] + nums[nums.length - 1])
        )
    }
    return sum
}

const solution = calibration(filePath)
console.log(`SOLUTION: ${solution}`)


function numbers(code: string): string {
    const numberWords = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    const numberValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    let result = ''
    while (code.length > 0) {
        let found = false
        for (let i = 0;i < numberWords.length;i++) {
            if (code.startsWith(numberWords[i])) {
                result += numberValues[i]
                code = code.substring(numberWords[i].length - 1)
                found = true
                break
            }
        }
        if (!found) {
            result += code.charAt(0)
            code = code.substring(1)

        }
    }

    return result
}
