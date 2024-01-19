import * as fs from 'fs'

const filePath = '../input.txt'


function Snowverload(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list = content.trim().split('\n')
    const rows = list.map(link => {
        const [node, connexion] = link.split(": ")
        const listOfConnexions = connexion.trim().split(" ")
        return [node, listOfConnexions]
    })
    const [links, listOfNodes] = getMaps(rows)
    return getProduct(links, listOfNodes)

}


function getMaps(rows: (string | string[])[][]): [(string | string[])[][], string[]] {
    const links = []
    const listOfNodes: string[] = []
    for (const link of rows) {
        const [node, connexions] = link
        for (const connectedNode of connexions) {
            const pair = [node, connectedNode].sort()
            links.push(pair)
            for (const member of pair) !listOfNodes.includes(member as string) && listOfNodes.push(member as string)
        }
    }
    return [links, listOfNodes]
}


function getProduct(links: (string | string[])[][], listOfNodes: string[]) {
    while (true) {
        const graph: Record<string, number> = {}
        for (let i = 0;i < 5;i++) {
            const [start, end] = getRandomPairOfNodes(listOfNodes)
            const path = dijkstra(start, end, links).toString().split('>')
            while (path.length > 1) {
                const node = path.splice(0, 2, path[1]).sort().toString()
                graph[node] ||= 0
                graph[node]++
            }
        }

        let maxNode = ''
        let max = 0
        for (const node in graph) {
            if (graph[node] > max) {
                max = graph[node]
                maxNode = node
            }
        }
        links.splice(links.findIndex(link => link.toString() === maxNode), 1)

        const path = dijkstra(maxNode.split(',')[0], maxNode.split(',')[1], links)
        if (typeof (path) !== "string") return path * (listOfNodes.length - path)
    }

}

function dijkstra(start: string, end: string, links: (string | string[])[][]) {
    const queue = [start]
    const visited = { [start]: start }

    while (queue.length > 0) {
        const node = queue.shift()
        if (!node) continue
        const connexions = links.filter(link => link.includes(node) || link[1].includes(node))
            .map(link => link.filter(linkNode => linkNode !== node)[0]).sort(randomSort)
        for (const connectedNode of connexions as string[]) {
            if (visited[connectedNode]) continue
            if (connectedNode === end) return visited[node] + '>' + connectedNode
            queue.push(connectedNode)
            visited[connectedNode] = visited[node] + '>' + connectedNode

        }
    }
    return Object.keys(visited).length

}

function getRandomPairOfNodes(listOfNodes: string[]) {
    const pair = ['', '']
    while (pair[0] === pair[1]) {
        pair[0] = listOfNodes[Math.floor(listOfNodes.length * Math.random())]
        pair[1] = listOfNodes[Math.floor(listOfNodes.length * Math.random())]
    }
    return pair
}

function randomSort() {
    return Math.random() > 0.5 ? 1 : -1
}


console.log(Snowverload(filePath))
