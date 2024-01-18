import * as fs from 'fs'

const filePath = '../input.txt'


function TheOdds(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const list = content.trim().split('\n')
    const rows = list.map(line => line.trim().split('@')).map(line => line.map(x => x.trim()))
    return getInitialPosition(rows)
}

function getInitialPosition(rows: string[][]) {
    const hailstoneList = getValues(rows)
    const A: bigint[][] = []
    const B: bigint[] = []
    for (let i = 1;i <= 3;i++) {
        const [px0, py0, pz0, vx0, vy0, vz0] = hailstoneList[0]
        const [pxN, pyN, pzN, vxN, vyN, vzN] = hailstoneList[i]
        A.push([BigInt(vy0 - vyN), BigInt(vxN - vx0), BigInt(0), BigInt(pyN - py0), BigInt(px0 - pxN), BigInt(0)])
        B.push(BigInt(px0 * vy0 - py0 * vx0 - pxN * vyN + pyN * vxN))
        A.push([BigInt(vz0 - vzN), BigInt(0), BigInt(vxN - vx0), BigInt(pzN - pz0), BigInt(0), BigInt(px0 - pxN)])
        B.push(BigInt(px0 * vz0 - pz0 * vx0 - pxN * vzN + pzN * vxN))
    }
    const determinant = determ(A)
    const [pxr, pyr, pzr] = A.map((_, i) => determ(A.map((r, j) => r.filter((_, k) => k !== i).concat([B[j]]))) / determinant)
    const result = BigInt(Math.abs(Number(pxr))) + BigInt(Math.abs(Number(pyr))) + BigInt(Math.abs(Number(pzr)))
    return result
}

function getValues(rows: string[][]) {
    const values = []
    for (let i = 0;i < rows.length;i++) {
        const [coord, velocity] = rows[i]
        const [x, y, z] = coord.split(',').map(BigInt)
        const [vx, vy, vz] = velocity.split(',').map(BigInt)
        values.push([x, y, z, vx, vy, vz])
    }
    return values
}

function determ(matrix: bigint[][]): bigint {
    if (matrix.length === 0) return BigInt(1)
    let [l, ...r] = matrix
    const result = l.map((n, i) => n * determ(r.map(row => row.filter((_, j) => j !== i))))
    return result.reduce((a, b, i) => (i % 2 ? a - b : a + b), BigInt(0))
}

console.log(TheOdds(filePath))
