export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public toString (): string {
        return `${this.x}|${this.y}`;
    }

    public static formatCoords(x:number, y:number): string {
        return `${x}|${y}`;
    }

    public static fromString(input:string) : Point{
        const bits = input.split('|');
        return new Point(parseInt(bits[0]), parseInt(bits[1]));
    }
}
