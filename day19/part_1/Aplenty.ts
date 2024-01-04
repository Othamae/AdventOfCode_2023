import * as fs from 'fs'

const filePath = '../input.txt'


function Aplenty(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list = content.trim().split('\n').map(line => line.trim())
    const [workflows, ratings] = getWorkflowsAndRatings(list)
    const startPoint = getStartPoint(workflows)
    return getTotalRatings(workflows, ratings, startPoint)

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

function getStartPoint(workflows: Workflow[]) {
    for (let i = 0;i < workflows.length;i++) {
        if (workflows[i].name === 'in') return i
    }
    return -1
}

function getNextPoint(workflows: Workflow[], next: string) {
    for (let i = 0;i < workflows.length;i++) {
        if (workflows[i].name === next) return i
    }
    return -1
}
function getTotalRatings(workflows: Workflow[], ratings: Rating[], startPoint: number) {
    let TotalCounter = 0
    for (let i = 0;i < ratings.length;i++) {
        TotalCounter += getAcceptedCounter(workflows, ratings[i], startPoint)
    }
    return TotalCounter
}

function getAcceptedCounter(workflows: Workflow[], ratings: Rating, startPoint: number) {
    const ratingsValues = getRatingValues(ratings)
    const instructions = getInstructions(workflows[startPoint])
    const last = instructions[instructions.length - 1][0]
    const valueOfRatingValues = Object.values(ratingsValues).reduce((a, b) => a + b, 0)
    for (let i = 0;i < instructions.length - 1;i++) {
        const letter = instructions[i][0].slice(0, 1) as RatingLetters
        const operation = instructions[i][0].slice(1, 2)
        const value = parseInt(instructions[i][0].slice(2))
        const next = instructions[i][1]
        const res = eval(`${ratingsValues[letter]} ${operation} ${value}`)
        if (res && next === 'A') return valueOfRatingValues
        if (res && next === 'R') return 0
        if (!res && i === instructions.length - 2) {
            if (last === 'A') return valueOfRatingValues
            if (last === 'R') return 0
            const nextPoint = getNextPoint(workflows, last)
            return getAcceptedCounter(workflows, ratings, nextPoint)
        }
        if (!res) continue
        const nextPoint = getNextPoint(workflows, next)
        return getAcceptedCounter(workflows, ratings, nextPoint)
    }
    return 0
}

function getRatingValues(rating: Rating) {
    const x = rating[0]['x']
    const m = rating[1]['m']
    const a = rating[2]['a']
    const s = rating[3]['s']
    return { x, m, a, s }
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

enum RatingLetters {
    x = 'x',
    m = 'm',
    a = 'a',
    s = 's'
}
console.log(Aplenty(filePath))
