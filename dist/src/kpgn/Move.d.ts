import { Piece } from '../ren';
export default class Move {
    moveFromIndex: number;
    moveToIndex: number;
    isJumping: boolean;
    capturedPiece: Piece | null;
    constructor(moveFromIndex: number, moveToIndex: number, capturedPiece: Piece | null, isJumping?: boolean);
    static fromMovedString(): string;
    toString(): string;
    toJson(): {
        fromIndex: number;
        toIndex: number;
        isJumping: boolean;
        capturedPiece: string;
    };
}
