import Piece from './Piece';
import Point from './Point';
export default class PieceIndex {
    point: Point;
    piece: Piece;
    constructor(x: number, y: number, piece: Piece | null);
    toCode(): string;
    toCharCode(): string;
}
