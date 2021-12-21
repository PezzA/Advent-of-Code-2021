import { getData } from "./common";
import {Point} from "./point";


export type HeightMap = Map<string, number>

export function parseData(input: string[]): [HeightMap, number, number] {

    const heightMap: HeightMap = new Map<string, number>();

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            const p = Point.formatCoords(x,y);
            heightMap.set(p, parseInt(input[y][x]))
        }
    }

    return [heightMap, input.length, input[0].length];
}

export function getBasin(lp: Point, map: HeightMap, current: HeightMap) {
    const check = map.get(lp.toString())

    if (check === 9 || check === undefined) {
        return
    }

    current.set(lp.toString(), 1)

    const upPoint = new Point(lp.x, lp.y - 1);
    const upDone = current.get(upPoint.toString());

    if (upDone === undefined) {
        getBasin(upPoint, map, current)
    }

    const downPoint = new Point(lp.x, lp.y + 1);
    const downDone = current.get(downPoint.toString());

    if (downDone === undefined) {
        getBasin(downPoint, map, current)
    }

    const leftPoint = new Point(lp.x - 1, lp.y);
    const leftDone = current.get(leftPoint.toString());

    if (leftDone === undefined) {
        getBasin(leftPoint, map, current)
    }

    const rightPoint = new Point(lp.x + 1, lp.y);
    const rightDone = current.get(rightPoint.toString());

    if (rightDone === undefined) {
        getBasin(rightPoint, map, current)
    }
}


export function getLowPoints(map: HeightMap, width: number, height: number): Point[] {
    let points: Point[] = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const cellBeingChecked = map.get(Point.formatCoords(x,y));

            if (cellBeingChecked === undefined) {
                throw new Error('unwrapping the undefined, should not happen')
            }
            var lowPoint = true

            const up = map.get(`${x}-${y - 1}`);
            if (up !== undefined && cellBeingChecked >= up) {
                lowPoint = false;
            }

            const down = map.get(`${x}-${y + 1}`);
            if (down !== undefined && cellBeingChecked >= down) {
                lowPoint = false;
            }

            const left = map.get(`${x - 1}-${y}`);
            if (left !== undefined && cellBeingChecked >= left) {
                lowPoint = false;
            }

            const right = map.get(`${x + 1}-${y}`);
            if (right !== undefined && cellBeingChecked >= right) {
                lowPoint = false;
            }

            if (lowPoint) {
                points.push(new Point(x, y))
            }
        }
    }
    return points
}

export function PartOne(filename: string): any {
    const [data, height, width] = parseData(getData(filename));

    const lowPoints = getLowPoints(data, width, height);

    let total = 0;

    lowPoints.forEach(lp => {
        total += (data.get(lp.toString()) ?? 0) + 1
    })
    return total
}

export function PartTwo(filename: string): any {
    const [data, height, width] = parseData(getData(filename));

    const lowPoints = getLowPoints(data, width, height);

    const sizes = new Int16Array(lowPoints.length)

    for (let i = 0; i < lowPoints.length; i++) {
        const basin = new Map<string, number>();
        getBasin(lowPoints[i], data, basin)

        sizes[i] = basin.size
    }

    sizes.sort((a, b) => b - a)

    return sizes[0] * sizes[1] * sizes[2]
}