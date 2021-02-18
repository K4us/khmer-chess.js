export class Piece {
    constructor(type: any, color: any);
    type: string;
    color: string;
    get pCode(): any;
    toOrigin(): Piece;
    toString(): string;
}
export class Pos {
    constructor(p: any, h: any, v: any);
    h: string;
    v: number;
    x: number;
    y: number;
    p: Piece;
    toString(): string;
    toPString(): string;
}
/**
 * BHGQKGHB/8/FFFFFFFF/8/8/ffffffff/8/bhgkqghb => bhgqkghb/......../ffffffff/......../......../FFFFFFFF/......../BHGKQGHB
 */
export class Board {
    constructor(boardStr: any);
    poses: Pos[];
    toMultiArray(): any[][];
    compress(str: any): any;
    extract(str: any): any;
    toStringFull(): string;
    toString(): string;
}
export class KqMoved {
    constructor(kqMovedStr?: string);
    whiteKing: boolean;
    whiteQueen: boolean;
    blackKing: boolean;
    blackQueen: boolean;
    toString(): string;
}
export class CountDown {
    constructor(countdownStr?: string);
    white: any;
    black: any;
    toString(): string;
}
export class Graveyard {
    constructor(graveyardStr?: string);
    pieces: any[];
    toString(): string;
}
export class REN {
    constructor(boardStr: any, turnStr: string, kqMovedStr: any, kAttackedStr: any, countdownStr: any, graveyardStr: any);
    board: Board;
    turn: string;
    kqMoved: KqMoved;
    kAttacked: KAttacked;
    countdown: CountDown;
    graveyard: Graveyard;
    isInvalidPieceCount(): string | false;
    toString(): string;
}
export const DEFAULT_BOARD_STR: "BHGQKGHB/8/FFFFFFFF/8/8/ffffffff/8/bhgkqghb";
declare class KAttacked {
    constructor(kAttackedStr?: string);
    whiteKing: boolean;
    blackKing: boolean;
    toString(): string;
}
export {};
