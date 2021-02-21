export default class Point {
    x: number;
    y: number;
    get index(): number;
    get indexCode(): string;
    get h(): string;
    get v(): number;
    constructor(x: number, y: number);
    static fromIndexCode(indexCode: string): Point;
    static fromIndex(index: number): Point;
    static xyToIndex(x: number, y: number): number;
    static isIndexInBoard(index: number): boolean;
}
