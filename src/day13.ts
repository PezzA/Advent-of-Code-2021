import {Point} from "./day09";
import {getData} from "./common";

interface Fold {
    axis: string
    pos:number
}

type Paper = Map<string, boolean>

export function parseData(input: string[]) : [Point[], Fold[]]{
    let folds: Fold[] = []
    let points: Point[] = []
    let processingPoints = true
    for(let i=0; i<input.length; i++){
        if(input[i]=== ''){
            processingPoints = false;
            continue;
        }

        if(processingPoints){
            const bits = input[i].split(',');
            points.push(new Point(parseInt(bits[0]), parseInt(bits[1])))
        } else {
            const parts = input[i].split('fold along ');
            const bits = parts[1].split('=');
            folds.push({axis:bits[0], pos:parseInt(bits[1])})
        }
    }
    return [points, folds]
}

export function getPaper(points: Point[]) : Paper {
    let paper = new Map<string, boolean>();

    points.forEach(e => {
        paper.set(e.toString(), true)
    })

    return paper
}

export function foldPaperUp(paper:Paper, pos: number){
    for(let [k, _] of paper){
        const p = Point.fromString(k)

        if(p.y > pos) {
            const newP = p.y - (2 * (p.y - pos))
            paper.set(new Point(p.x, newP).toString(), true)
            paper.delete(k)
        }
    }
}

export function foldPaperLeft(paper:Paper, pos: number){
    for(let [k, v] of paper){
        const p = Point.fromString(k)

        if(p.x > pos) {
            const newP = p.x - (2 * (p.x - pos))
            paper.set(new Point(newP, p.y).toString(), true)
            paper.delete(k)
        }
    }
}

export function foldPaper(paper:Paper, fold: Fold){

    if(fold.axis === 'y') {
        foldPaperUp(paper, fold.pos)
    }

    if(fold.axis === 'x') {
        foldPaperLeft(paper, fold.pos)
    }
}

export function PartOne(filename: string) : number {
    const [points, folds] = parseData(getData(filename));

    const paper = getPaper(points)

    foldPaper(paper, folds[0])

    return paper.size
}

export function PartTwo(filename: string) : any {
    const [points, folds] = parseData(getData(filename));

    const paper = getPaper(points)

    for(let fold of folds){
        foldPaper(paper, fold)
    }

    let output: string[] = []

    for(let y = 0; y< 6;y++){
        output.push("")
        for(let x = 0; x< 40;x++){
            const p = paper.get(new Point(x, y).toString())

            if(p=== undefined){
                output[y]+= " ";
            } else{
                output[y]+= "#";
            }
        }
    }

    return output
}