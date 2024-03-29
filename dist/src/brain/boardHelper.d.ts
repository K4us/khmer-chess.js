import Point from '../ren/Point';
import Piece from '../ren/Piece';
import { PieceIndex } from '../ren';
export declare class CountUpState {
    countingToNumber: number;
    countingNumber: number;
    constructor(countingNumber: number, countingToNumber: number);
}
declare class BoardHelper {
    getCharPieceFromString(piecesString: string, index: number): string;
    getCharPieceInPos(index: number, piecesString: string): string;
    getPieceByIndex(index: number, piecesString: string): {
        isValidPiece: boolean;
        piece: Piece | null;
    };
    convertMask: (point1: Point, index: number, color: string) => number | null;
    getPieceCanMovePoses(index: number, piece: Piece): number[];
    getPieceCanMovePosesValid(index: number, piece: Piece, piecesString: string): number[];
    replacePiecesStringAtIndex(piecesString: string, charCode: string, index: number): string;
    injectPiece(piecesString: string, index1: number, index2: number): string | null;
    getKingWillInDanger(color: string, piecesString: string): Point[] | null;
    getKingInDanger(color: string, piecesString: string): Point[] | null;
    genCanMovePointsByPiecePoint(index: number, piece: Piece, piecesString: string, isHasMoved?: boolean): Point[];
    isCharPiecesInBoard(code: string, piecesString: string): boolean;
    getPiecesInBoard(piecesString: string): string[];
    isHaveCaptured(piecesString: string): boolean;
    filterPieceInBoard(piecesString: string): {
        whitePieces: PieceIndex[];
        blackPieces: PieceIndex[];
    };
    extractPiecesToArray(piecesString: string): {
        [key: string]: string[];
    };
    isStateCount(c: string, piecesString: string): boolean;
    checkCountable(color: string, piecesString: string): boolean;
    checkCount(color: string, piecesString: string, force: boolean): CountUpState | null;
    isUpgradable(piece: Piece, point: Point): boolean;
}
declare const _default: BoardHelper;
export default _default;
