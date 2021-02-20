export declare class Rectangle {
    x: any;
    y: any;
    width: any;
    height: any;
    constructor(x: any, y: any, width: any, height: any);
    isContainsPoint(point: {
        x: any;
        y: any;
    }): boolean;
}
declare const boardHelper: {
    HORIZONTAL_CODE_LETTERS: string;
    HORIZONTAL_NOTE_LETTERS: string[];
    VERTICAL_NOTE_LETTERS: string[];
    HORIZONTAL_NOTE_LETTERS_ASCII: string;
    VERTICAL_NOTE_LETTERS_ASCII: string[];
    PIECE_COLOR_WHITE: string;
    PIECE_COLOR_BLACK: string;
    PIECE_TYPE_TOUK: string;
    PIECE_TYPE_SES: string;
    PIECE_TYPE_KOL: string;
    PIECE_TYPE_SDECH: string;
    PIECE_TYPE_NEANG: string;
    PIECE_TYPE_TREY: string;
    PIECE_TYPE_BORK: string;
    EMPTY_PIECE: string;
    BOARD_SEPARATOR: string;
    ROW_NUMBER: number;
    ROW_FIRST_INDEX: number;
    ROW_LAST_INDEX: number;
    getPieceCharArray(): any[];
    getColorArray(): any[];
    isValidPiecesString(str: string, onlyPiece?: any): boolean;
    toWhitePiece: (str: string) => string;
    toBlackPiece: (str: string) => string;
    isValidPosXY(point: {
        x: any;
        y: any;
    }, y: any): any;
    isValidPiece: (piece: any) => boolean;
    isWhite: (c: any) => boolean;
    isBlack: (c: any) => boolean;
    codeP: (h: any, v: any) => {
        h: any;
        v: any;
    };
    p: (x: any, y: any) => {
        x: any;
        y: any;
    };
    res: (width: any, height: any) => {
        width: any;
        height: any;
    };
    rect: (x: any, y: any, width: any, height: any) => Rectangle;
    getSubBoardNumber: () => number;
    nerdPosToXY(p: any): any;
    nerdXyToPos(x: any, y?: any): any;
    indexCodeToPos(code: any[]): any;
    pointToIndexCode(p: {
        x: string | number;
        y: number;
    }): string;
    xyToIndexCode(x: any, y: any): any;
    posToIndexCode(p: any): any;
    isPosInBoard(posInBoard: number): boolean;
    getCharPieceFromString(piecesString: string, posInBoard: any): any;
    getPieceProperties(code: string | number): {
        color: any;
        type: any;
    };
    getCharPieceInPos(posInBoard: any, piecesString: any): any;
    getPieceInPos(posInBoard: any, y: any, piecesString: any): {
        isValidPiece: any;
        color: any;
        type: any;
    };
    convertMask(p: {
        x: number;
        y: number;
    }, pos: {
        x: number;
        y: number;
    }, color: any): any;
    getPieceCanMovePoses(type: string | number, pos: any, color: any): any[];
    getPieceCanMovePosesValid(type: any, pos: any, color: any, piecesString: any): any[];
    replacePiecesString(piecesString: string, c: any, p: number): string;
    injectPiece(piecesString: string, pos1: any, pos2: any): string;
    getPieceCode(color: any, type: any): any;
    getKingWillInDanger(color: any, piecesString: string | any[]): any[];
    getKingInDanger(color: any, piecesString: string | any[]): any[];
    numToCodeP(number: number): any;
    numToCode(number: any): string;
    generatePosesCanMove(type: any, pos: any, color: any, piecesString: any, isHaveMoved: any): any[];
    isCharPiecesInBoard(c: any, piecesString: string | any[]): boolean;
    getPiecesInBoard(piecesString: string): string[];
    isHaveCaptured(piecesString: any): boolean;
    filterPieceInBoard(piecesString: string): {
        whitePieces: any[];
        blackPieces: any[];
    };
    extractPiecesToArray(piecesString: {
        split: (arg0: string) => any;
        forEach: (arg0: (e: any) => void) => void;
    }): {
        [x: string]: any[];
        [x: number]: undefined[];
    };
    isStateCount(c: string | number, piecesString: any): boolean;
    checkCountable(color: string | number, piecesString: any): boolean;
    checkCount(color: string | number, piecesString: any, force: any): any[];
    getHashKey(val: any): any;
    getPieceKeyByProp(prop: {
        color: any;
        type: any;
    }): any;
    getPieceKeyByName(name: any[]): any;
    oppositeColor(color: any): any;
};
export default boardHelper;
