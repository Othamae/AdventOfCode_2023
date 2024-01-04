import * as fs from 'fs'

const filePath = '../input.txt'


function Aplenty(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list = content.trim().split('\n').map(line => line.trim())
    const [workflows] = getWorkflowsAndRatings(list)
    return getRatingCombination(workflows)

}

function getWorkflowsAndRatings(list: string[]): [Workflow[], Rating[]] {
    const workflows = []
    const ratings = []
    let breakPoint = false
    for (let line of list) {
        if (line === '') {
            breakPoint = true
            continue
        }
        if (breakPoint) {
            const rating = getValues(line)
            ratings.push(rating)
        } else {
            const [name, instructions] = line.slice(0, -1).split('{')
            workflows.push({ name, instructions })
        }
    }
    return [workflows, ratings]
}

function getValues(line: string): Rating {
    const lineValues = line.slice(0, -1).split('{')[1]
    const split = lineValues.split(',').map(value => value.split('='))
    const values: Rating = split.map(([key, value]) => ({ [key]: parseInt(value, 10) }))
    return values
}

function getRatingCombination(workflows: Workflow[]) {
    const range: Range = {
        x: [1, 4000],
        m: [1, 4000],
        a: [1, 4000],
        s: [1, 4000],
    }
    const validRanges = getValidRanges(workflows, range, 'in')
    return validRanges
        .map((range) =>
            Object.values(range).reduce((acc, [min, max]) => acc * (max - min + 1), 1)
        )
        .reduce((acc: number, v: number) => acc + v, 0)
}
function getValidRanges(workflows: Workflow[], range: Range, name: string): Range[] {
    if (name === 'R') return []
    if (name === 'A') return [cloneRange(range)]
    const startPoint = getNextPoint(workflows, name)
    const instructions = getInstructions(workflows[startPoint])
    const ranges = []
    const last = instructions[instructions.length - 1][0]
    for (let i = 0;i < instructions.length - 1;i++) {
        const letter = instructions[i][0].slice(0, 1) as RatingLetters
        const operation = instructions[i][0].slice(1, 2)
        const value = parseInt(instructions[i][0].slice(2))
        const next = instructions[i][1]
        if (operation === '<') {
            const newRange = cloneRange(range)
            newRange[letter][1] = value - 1
            ranges.push(...getValidRanges(workflows, newRange, next))
            range[letter][0] = value
        }
        if (operation === '>') {
            const newRange = cloneRange(range)
            newRange[letter][0] = value + 1
            ranges.push(...getValidRanges(workflows, newRange, next))
            range[letter][1] = value
        }
        if (i === instructions.length - 2) ranges.push(...getValidRanges(workflows, cloneRange(range), last))
    }
    return ranges
}

const cloneRange = (range: Range) => JSON.parse(JSON.stringify(range))

function getNextPoint(workflows: Workflow[], next: string) {
    for (let i = 0;i < workflows.length;i++) {
        if (workflows[i].name === next) return i
    }
    return -1
}

function getInstructions(workflow: Workflow) {
    const array = workflow.instructions
    const instructions = array.split(',').map(value => value.split(':'))
    return instructions
}

type Workflow = {
    name: string
    instructions: string
}
type Rating = {
    [key: string]: number
}[]
type Range = Record<string, [number, number]>

enum RatingLetters {
    x = 'x',
    m = 'm',
    a = 'a',
    s = 's'
}
console.log(Aplenty(filePath))
