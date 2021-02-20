import Piece from './Piece';
export default class Pos {
    x: number;
    y: number;
    piece: Piece;
    constructor(x: number, y: number, piece: Piece | null);
    toString(): any;
    toPString(): string;
}
