import Rectangle from './Rectangle';
declare const boardHelper: {
    getPieceCharArray(): string[];
    getColorArray(): string[];
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
    indexCodeToPos(code: string): any;
    pointToIndexCode(p: {
        x: string | number;
        y: number;
    }): string;
    xyToIndexCode(x: any, y: any): any;
    posToIndexCode(p: any): any;
    isPosInBoard(posInBoard: number): boolean;
    getCharPieceFromString(piecesString: string, posInBoard: any): string;
    getPieceProperties(code: string | number): {
        color: string;
        type: string;
    };
    getCharPieceInPos(posInBoard: any, piecesString: any): any;
    getPieceInPos(posInBoard: any, y: any, piecesString: any): {
        isValidPiece: any;
        color: string;
        type: string;
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
    getPieceCode(color: any, type: any): string;
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
    getHashKey(val: any): string;
    getPieceKeyByProp(prop: {
        color: any;
        type: any;
    }): string;
    getPieceKeyByName(name: any[]): any;
    oppositeColor(color: any): "w" | "b";
};
export default boardHelper;
