import {navigate, parseData} from "./day12";

const testCases: [string, number, number][] = [[`start-A
start-b
A-c
A-b
b-d
A-end
b-end`, 10, 36], [`dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`,19,103],[`fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`,226,3509]]


test.each(testCases)('in %s it finds %s routes', (caves, expectedPart1, expectedPart2)=>{
    const cg = parseData(caves.split('\n'));

    let completedPaths : string[][] = []
    navigate(cg, ["start"], completedPaths, false)

    expect(completedPaths.length).toBe(expectedPart1)
})

test.each(testCases)('in %s it finds %s routes', (caves, expectedPart1, expectedPart2)=>{
    const cg = parseData(caves.split('\n'));

    let completedPaths : string[][] = []
    navigate(cg, ["start"], completedPaths, true)

    expect(completedPaths.length).toBe(expectedPart2)
})
