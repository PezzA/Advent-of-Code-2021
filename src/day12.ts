import {getData} from "./common";

interface Cave {
    name: string
    big: boolean
    connections: Cave[]
}

type CaveGraph = Map<string, Cave>

const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function isBigCave(input:string): boolean {
    return [...input].every(l => upperCaseLetters.indexOf(l) !== -1);
}

export function parseData(input: string[]) : CaveGraph {
    let cg = new Map<string, Cave>();

    // add all caves to the map
    for (let i=0; i< input.length; i++){
        const bits = input[i].split('-');

        const testCave = cg.get(bits[0])
        if(testCave === undefined){
            cg.set(bits[0], { name:bits[0], big:isBigCave(bits[0]), connections:[]})
        }

        const testCave2 = cg.get(bits[1])
        if(testCave2 === undefined){
            cg.set(bits[1], {name:bits[1], big:isBigCave(bits[1]), connections:[]})
        }
    }

    for (let i=0; i< input.length; i++){
        const bits = input[i].split('-');

        const cave1 = cg.get(bits[0])
        const cave2 = cg.get(bits[1])

        if (cave1 === undefined || cave2 === undefined){
            throw new Error("new cave in second pass!")
        }

        if(cave1.connections.find(conn => conn.name == cave2.name) === undefined){
            cave1.connections.push(cave2)
        }

        if(cave2.connections.find(conn => conn.name == cave1.name) === undefined){
            cave2.connections.push(cave1)
        }
    }

    return (cg)
}

export function containsMultiSmallCave(currentPath: string[], cg: CaveGraph) : boolean {
    let visits = new Map<string, number>();

    for(let i = 0; i< currentPath.length; i++){
        const cave = cg.get(currentPath[i])

        if(cave === undefined){
            throw new Error("should not get here")
        }

        if(cave.big || cave.name === "start" || cave.name === "end"){
            continue
        }

        const visit = visits.get(currentPath[i])
        if(visit === undefined){
            visits.set(currentPath[i], 1)
        } else{
            visits.set(currentPath[i],visit + 1)
        }
    }

    for(let [k,v] of visits) {
        if (v>1){
            return true
        }
    }

    return false
}

export function isNavigableCave(c: Cave, currentPath: string[], multiSmallCave: boolean, cg: CaveGraph) : boolean {
    if(c.big){
        return true
    }

    if(currentPath.find(s => c.name === s) === undefined){
        return true
    }

    if(multiSmallCave && c.name !== "start" && c.name !== "end" && !containsMultiSmallCave(currentPath, cg)){
        return true
    }
    return false
}



export function navigate(cg: CaveGraph, currentPath: string[], completedPaths: string[][], multiSmallCave: boolean){
    const currentCave = cg.get(currentPath[currentPath.length-1])

    if(currentCave === undefined) {
        throw new Error("could not find cave, very unexpected")
    }

    if(currentCave.name === "end"){
        completedPaths.push(currentPath.map(e => e))
        return
    }

    for(let i = 0; i < currentCave.connections.length; i++){
        if(isNavigableCave(currentCave.connections[i], currentPath, multiSmallCave, cg)) {
            const newPath = currentPath.map(e => e)
            newPath.push(currentCave.connections[i].name)
            navigate(cg, newPath, completedPaths, multiSmallCave)
        }
    }
}

export function PartOne(fileName: string): number {
    const cg = parseData(getData(fileName));

    let completedPaths : string[][] = []
    navigate(cg, ["start"], completedPaths, false)

    return completedPaths.length
}

export function PartTwo(fileName: string): number {
    const cg = parseData(getData(fileName));

    let completedPaths : string[][] = []
    navigate(cg, ["start"], completedPaths, true)

    return completedPaths.length
}