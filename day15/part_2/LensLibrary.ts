import * as fs from 'fs'

const filePath = '../input.txt'


function LensLibrary(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list = content.trim().split(',')
    const labelList = getLabels(list)
    const box = addToBox(labelList)
    return getPower(box)
}


function getLabels(list: string[]) {
    const labelList: [string, number][] = []
    list.forEach(str => {
        if (str.includes('=')) {
            const [label, length] = str.split('=')
            labelList.push([label, Number(length)])
        }
        if (str.includes('-')) {
            const [label] = str.split('-')
            labelList.push([label, 0])
        }
    })
    return labelList
}

function addToBox(labelList: [string, number][]) {
    const box = new Map<number, [string, number][]>()
    for (let label of labelList) {
        const boxNumber = getValue(label[0])
        if (label[1] === 0 && box.has(boxNumber)) {
            const boxContent = box.get(boxNumber)
            if (boxContent) {
                const newBoxContent = boxContent.filter(cont => cont[0] !== label[0])
                box.set(boxNumber, newBoxContent)
            }
            continue
        }
        if (box.has(boxNumber)) {
            const boxContent = box.get(boxNumber)
            if (boxContent) {
                let exist = false
                for (let content of boxContent) {
                    if (content[0] === label[0]) {
                        content[1] = label[1]
                        exist = true
                        break
                    }
                }
                !exist && box.set(boxNumber, [...boxContent, label])

            }
        } else {
            box.set(boxNumber, [label])
        }

    }
    return box
}

function getPower(box: Map<number, [string, number][]>) {
    let power = 0
    for (let [key, value] of box) {
        for (let i = 0;i < value.length;i++) {
            power += (key + 1) * (i + 1) * value[i][1]
        }
    }
    return power
}


function getValue(string: string) {
    let value = 0
    for (let i = 0;i < string.length;i++) {
        value += string.charCodeAt(i)
        value *= 17
        value %= 256
    }
    return value
}

console.log(LensLibrary(filePath))
