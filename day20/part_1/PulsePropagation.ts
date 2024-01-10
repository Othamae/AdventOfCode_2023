import * as fs from 'fs'

const filePath = '../input.txt'


function PulsePropagation(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list = content.trim().split('\n').map(line => line.trim().split(' -> ')).map(line => [line[0], line[1].split(', ')])
    const [moduleMap, inputs] = createModuleMap(list)
    return getPulses(moduleMap, inputs)

}


function createModuleMap(list: (string | string[])[][]): [ModuleMap[], Inputs] {
    const moduleMap: ModuleMap[] = []
    const inputs: Inputs = {}
    for (let element of list) {
        if (element[0] === 'broadcaster') {
            const name = element[0]
            const destination = element[1] as string[]
            const module = { name, destination, moduleType: '', pulse: 0, from: '' }
            moduleMap.push(module)
            continue
        }
        const name = element[0].slice(1) as string
        const moduleType = element[0].slice(0, 1) as string
        const destination = element[1] as string[]
        const module = { name, destination, moduleType, pulse: 0, from: '' }
        moduleMap.push(module)
    }
    for (const module of moduleMap) {
        for (const d of module.destination) {
            inputs[d] ??= {}
            inputs[d][module.name] = 0
        }
    }


    return [moduleMap, inputs]
}

function getPulses(moduleMap: ModuleMap[], inputs: Inputs) {
    let pulses = [0, 0]
    for (let i = 0;i < 1000;i++) {
        const queue: Queue[] = [{ from: '', name: 'broadcaster', pulseQ: 0 }]
        pulses[0]++
        while (queue.length > 0) {
            const module = queue.shift()
            if (!module) continue
            const { from, name, pulseQ } = module
            const currentModule = moduleMap.find(m => m.name === name)
            if (!currentModule) continue
            const { destination, moduleType, pulse } = currentModule
            if (name === 'broadcaster') {
                for (let dest of destination) {
                    queue.push({ from: name, name: dest, pulseQ })
                    pulses[pulseQ]++
                }
                continue
            }
            if (moduleType === '%' && pulseQ === 0) {
                currentModule.pulse = pulse ? 0 : 1
                const nPulse = pulse ? 0 : 1
                for (let dest of destination) {
                    queue.push({ from: name, name: dest, pulseQ: nPulse })
                    pulses[nPulse]++
                }
                continue
            }
            if (moduleType === '&') {
                inputs[name][from] = pulseQ
                const nPulse = Object.values(inputs[name]).every(Boolean) ? 0 : 1
                for (let dest of destination) {
                    queue.push({ from: name, name: dest, pulseQ: nPulse })
                    pulses[nPulse]++
                }
                continue
            }

        }
    }
    return pulses[0] * pulses[1]
}


type ModuleMap = {
    name: string,
    destination: string[],
    moduleType: string,
    pulse: number,
    from: string
}
type Inputs = {
    [key: string]: {
        [name: string]: number
    }
}

type Queue = {
    from: string,
    name: string,
    pulseQ: number
}
console.log(PulsePropagation(filePath))

