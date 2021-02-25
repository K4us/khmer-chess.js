export default class Piece {
    type: string;
    color: string;
    get pieceCharCode(): string;
    get title(): string;
    constructor(type: string, color: string);
    static fromCharCode(charCode: string): Piece;
    toOriginPiece(): Piece;
    static get pieceChars(): string[];
    static get colorChars(): string[];
    static toWhiteCharCode(charCode: string): string;
    static isWhiteCharCode(charCode: string): boolean;
    static toBlackCharCode(charCode: string): string;
    static toNormalCharCode(charCode: string): string;
    static isValidPiece(charCode: string): boolean;
    static isWhiteColor(c: string): boolean;
    static isBlackColor(c: string): boolean;
    static oppositeColor(color: any): "w" | "b";
    static isValidPiecesString(str: string, onlyPiece?: boolean): boolean;
}
