export default class Piece {
    type: string;
    color: string;
    get pCode(): string;
    constructor(type: string, color?: string);
    toOrigin(): Piece;
    toString(): string;
}
