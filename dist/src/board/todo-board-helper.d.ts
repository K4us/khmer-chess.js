import Rectangle from './Rectangle';
export declare const PIECE_COLOR_WHITE = "w";
export declare const PIECE_COLOR_BLACK = "b";
export declare const PIECE_TYPE_TOUK = "b";
export declare const PIECE_TYPE_SES = "h";
export declare const PIECE_TYPE_KOL = "g";
export declare const PIECE_TYPE_SDECH = "k";
export declare const PIECE_TYPE_NEANG = "q";
export declare const PIECE_TYPE_TREY = "f";
export declare const PIECE_TYPE_BORK = "t";
export declare const EMPTY_PIECE = ".";
export declare const PIECE_COLOR_EMPTY = "";
export declare const BOARD_SEPARATOR = "/";
export declare const HORIZONTAL_CODE_LETTERS = "abcdefgh";
export declare const HORIZONTAL_NOTE_LETTERS: string[];
export declare const VERTICAL_NOTE_LETTERS: string[];
export declare const HORIZONTAL_NOTE_LETTERS_ASCII = "abcdefgh";
export declare const VERTICAL_NOTE_LETTERS_ASCII: string[];
export declare const ROW_NUMBER = 8;
export declare const ROW_FIRST_INDEX = 0;
export declare const ROW_LAST_INDEX = 7;
export declare function getPieceCharArray(): string[];
export declare function getColorArray(): string[];
export declare function isValidPiecesString(str: string, onlyPiece?: boolean): boolean;
export declare const toWhitePiece: (str: any) => any;
export declare const toBlackPiece: (str: string) => string;
export declare class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
declare class HvPont {
    h: string;
    v: number;
    constructor(h: string, v: number);
}
export declare const isValidPiece: (piece: string) => boolean;
export declare const isWhite: (c: string) => boolean;
export declare const isBlack: (c: string) => boolean;
export declare const hvPoint: (h: string, v: number) => HvPont;
export declare const p: (x: number, y: number) => Point;
export declare const res: (width: number, height: number) => {
    width: number;
    height: number;
};
export declare const rect: (x: number, y: number, width: number, height: number) => Rectangle;
export declare const getSubBoardNumber: () => number;
export declare const indexToPoint: (index: number) => Point;
export declare const pointToIndex: (point: Point) => number;
export declare const indexCodeToIndex: (code: string) => number;
export declare const pointToIndexCode: (p: Point) => string;
export declare const indexToIndexCode: (index: number) => string;
export declare const isPosInBoard: (posInBoard: number) => boolean;
export declare const getCharPieceFromString: (piecesString: string, posInBoard: number) => string;
declare type PieceProp = {
    color: string;
    type: string;
};
export declare const getPieceProperties: (code: string) => PieceProp;
export declare const getCharPieceByIndex: (index: number, piecesString: string) => string;
export declare const getPieceByPoint: (point: Point, piecesString: string) => {
    isValidPiece: boolean;
    color: string;
    type: string;
};
export declare const getPieceByIndex: (index: number, piecesString: string) => {
    isValidPiece: boolean;
    color: string;
    type: string;
};
export declare const convertMask: (point1: Point, point2: Point, color: string) => number;
export declare const getPieceCanMovePoses: (type: string, index: number, color: string) => number[];
export declare const getPieceCanMovePosesValid: (type: string, point: Point, color: string, piecesString: string) => any[];
export declare const replacePiecesString: (piecesString: string, c: string, p: number) => string;
export declare const injectPiece: (piecesString: string, index1: number, index2: number) => string;
export declare const getPieceCode: (color: string, type: string) => string;
export declare const getKingWillInDanger: (color: string, piecesString: string) => string[];
export declare const getKingInDanger: (color: string, piecesString: string) => string[];
export declare const numToHVPont: (number: number) => HvPont;
export declare const numToCode: (number: number) => string;
export declare const generatePosesCanMove: (type: string, point: Point, color: string, piecesString: string, isHaveMoved: boolean) => any[];
export declare const isCharPiecesInBoard: (c: string, piecesString: string) => boolean;
export declare const getPiecesInBoard: (piecesString: string) => string[];
export declare const isHaveCaptured: (piecesString: string) => boolean;
export declare const filterPieceInBoard: (piecesString: string) => {
    whitePieces: any[];
    blackPieces: any[];
};
export declare const extractPiecesToArray: (piecesString: string) => {
    [key: string]: string[];
};
export declare const isStateCount: (c: number, piecesString: string) => boolean;
export declare const checkCountable: (color: string, piecesString: string) => boolean;
export declare const checkCount: (color: string, piecesString: string, force: any) => number[];
export declare const getHashKey: (val: string) => string;
export declare const getPieceKeyByProp: (prop: PieceProp) => string;
export declare const getPieceKeyByName: (name: string) => string;
export declare const oppositeColor: (color: string) => "w" | "b";
export declare const pieceHash: {
    [key: string]: string;
};
export {};
