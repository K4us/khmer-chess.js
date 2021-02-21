import { Piece, Point } from '../ren/index';
declare class BoardHelper {
    isValidPiecesString(str: string, onlyPiece?: boolean): boolean;
    getCharPieceFromString(piecesString: string, index: number): string;
    getPieceProperties(pieceCode: string): {
        color: string;
        type: string;
    };
    getCharPieceInPos(index: number, piecesString: string): string;
    getPieceByIndex(index: number, piecesString: string): {
        isValidPiece: boolean;
        color: string;
        type: string;
    };
    convertMask(point: Point, index: number, color: string): boolean;
    getPieceCanMovePoses(index: number, piece: Piece): any[];
    getPieceCanMovePosesValid(index: number, piece: Piece, piecesString: string): any[];
    replacePiecesStringAtIndex(piecesString: string, c: string, index: number): string;
    injectPiece(piecesString: string, index1: number, index2: number): string;
    getPieceCode(piece: Piece): string;
    getKingWillInDanger(color: string, piecesString: string): Point[];
    getKingInDanger(color: string, piecesString: string): Point[];
    generatePosesCanMove(index: number, piece: Piece, piecesString: string, isHaveMoved: boolean): any[];
    isCharPiecesInBoard(code: string, piecesString: string): boolean;
    getPiecesInBoard(piecesString: string): string[];
    isHaveCaptured(piecesString: string): boolean;
    filterPieceInBoard(piecesString: string): {
        whitePieces: any[];
        blackPieces: any[];
    };
    extractPiecesToArray(piecesString: string): {
        [x: string]: string[];
    };
    isStateCount(c: string, piecesString: string): boolean;
    checkCountable(color: string, piecesString: string): boolean;
    checkCount(color: string, piecesString: string, force: boolean): number[];
    getHashKey(val: string): string;
    getPieceKeyByProp(prop: Piece): string;
    getPieceKeyByName(name: any[]): string;
}
declare const _default: BoardHelper;
export default _default;
