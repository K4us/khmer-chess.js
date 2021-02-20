/*
 * Copyright (c) 2021, K4us
 * Author: Raksa Eng <eng.raksa@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 *---------------------------------------------------------------------------- */
import jsis from './jsis';
import genMask from './genMask';
import {
    PIECE_COLOR_WHITE,
    PIECE_COLOR_BLACK,
    EMPTY_PIECE,
    pieceHash,
    ROW_NUMBER,
} from './constant';
import { PIECE_COLOR_EMPTY } from './todo-board-helper';

const mask = genMask();

export class Rectangle {
    x: any;
    y: any;
    width: any;
    height: any;
    constructor(x: any, y: any, width: any, height: any) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    isContainsPoint(point: { x: any; y: any; }) {
        const { x, y } = point;
        const isContainsPoint = this.x <= x &&
            (this.x + this.width) >= x &&
            this.y <= y &&
            (this.y + this.height) >= y;
        return isContainsPoint;
    }
}
let allPiecesString: any = null;
const boardHelper = {
    getPieceCharArray() {
        return [
            this.PIECE_TYPE_TOUK,
            this.PIECE_TYPE_SES,
            this.PIECE_TYPE_KOL,
            this.PIECE_TYPE_SDECH,
            this.PIECE_TYPE_NEANG,
            this.PIECE_TYPE_TREY,
            this.PIECE_TYPE_BORK,
        ];
    },
    getColorArray() {
        return [
            PIECE_COLOR_WHITE,
            PIECE_COLOR_BLACK,
        ];
    },
    isValidPiecesString(str: string, onlyPiece?: any) {
        if (jsis.isNull(allPiecesString)) {
            allPiecesString = [
                ...this.getPieceCharArray(),
                ...this.getPieceCharArray().map((c: any) => this.toWhitePiece(c)),
                this.EMPTY_PIECE,
                this.BOARD_SEPARATOR,
            ];
        }
        const ruler = onlyPiece ? allPiecesString.filter((c: any) => {
            return !~[this.EMPTY_PIECE, this.BOARD_SEPARATOR].indexOf(c);
        }) : allPiecesString;
        return !str.split('').some((c: any) => {
            return !~ruler.indexOf(c);
        });
    },

    toWhitePiece: (str: string) => str.toUpperCase(),
    toBlackPiece: (str: string) => str.toLowerCase(),

    isValidPosXY(point: { x: any; y: any; }, y: any) {
        if (jsis.isUndefined(point)) {
            return false;
        }
        if (!jsis.isUndefined(y)) {
            point = this.p(point, y);
        }
        return !jsis.isUndefined(point.x) && !jsis.isUndefined(point.y) &&
            this.rect(0, 0, this.ROW_LAST_INDEX, this.ROW_LAST_INDEX).isContainsPoint(point);
    },
    isValidPiece: (piece: any) => piece !== EMPTY_PIECE,
    isWhite: (c: any) => c === PIECE_COLOR_WHITE,
    isBlack: (c: any) => c === PIECE_COLOR_BLACK,
    codeP: (h: any, v: any) => ({ h, v }),
    p: (x: any, y: any) => ({ x, y }),
    res: (width: any, height: any) => ({ width, height }),
    rect: (x: any, y: any, width: any, height: any) => new Rectangle(x, y, width, height),
    getSubBoardNumber: () => ROW_NUMBER * ROW_NUMBER,
    nerdPosToXY(p: any) {
        if (jsis.isNumber(p.x) && jsis.isNumber(p.y)) {
            return p;
        }
        if (jsis.isNumber(p)) {
            const x = p % ROW_NUMBER;
            const y = Math.floor(p / ROW_NUMBER);
            return this.p(x, y);
        }
        return null;
    },
    nerdXyToPos(x: any, y?: any) {
        if (!jsis.isUndefined(y)) {
            return x + y * ROW_NUMBER;
        }
        return x.x + x.y * ROW_NUMBER;
    },
    indexCodeToPos(code: any[]) {
        const x = this.HORIZONTAL_CODE_LETTERS.indexOf(code[0]);
        const y = Number(code[1]) - 1;
        return this.nerdXyToPos(x, y);
    },
    pointToIndexCode(p: { x: string | number; y: number; }) {
        return `${this.HORIZONTAL_CODE_LETTERS[p.x]}${p.y + 1}`;
    },
    xyToIndexCode(x: any, y: any) {
        return this.pointToIndexCode(this.p(x, y));
    },
    posToIndexCode(p: any) {
        if (jsis.isNumber(p.x) && jsis.isNumber(p.y)) {
            return this.pointToIndexCode(p);
        }
        if (jsis.isNumber(p)) {
            const x = p % ROW_NUMBER;
            const y = Math.floor(p / ROW_NUMBER);
            return this.xyToIndexCode(x, y);
        }
        return null;
    },
    isPosInBoard(posInBoard: number) {
        return jsis.isNumber(posInBoard) &&
            posInBoard >= 0 && posInBoard <= this.getSubBoardNumber() - 1;
    },
    getCharPieceFromString(piecesString: string, posInBoard: any) {
        if (this.isPosInBoard(posInBoard) && piecesString.length === this.getSubBoardNumber()) {
            return piecesString.charAt(posInBoard);
        }
        return this.EMPTY_PIECE;
    },
    getPieceProperties(code: string | number) {
        const h = pieceHash[code];
        return {
            color: h ? h[0] : PIECE_COLOR_EMPTY,
            type: h ? h[1] : this.EMPTY_PIECE,
        };
    },
    getCharPieceInPos(posInBoard: any, piecesString: any) {
        return this.getCharPieceFromString(piecesString, posInBoard);
    },
    getPieceInPos(posInBoard: any, y: any, piecesString: any) {
        if (jsis.isNumber(y)) {
            posInBoard = this.nerdXyToPos(posInBoard, y);
        } else if (jsis.isString(y)) {
            piecesString = y;
        }
        const piece = this.getCharPieceInPos(posInBoard, piecesString);
        let color = PIECE_COLOR_WHITE; let type = this.PIECE_TYPE_TREY;
        if (this.isValidPiece(piece)) {
            const pr = this.getPieceProperties(piece);
            color = pr.color;
            type = pr.type;
        }
        return {
            isValidPiece: this.isValidPiece(piece),
            color: color,
            type: type,
        };
    },
    convertMask(p: { x: number; y: number; }, pos: { x: number; y: number; }, color: any) {
        const sign = this.isWhite(color) ? 1 : -1;
        pos = this.nerdPosToXY(pos);
        p.x = p.x * sign + pos.x;
        p.y = p.y * sign + pos.y;
        return this.isValidPosXY(p) ? this.nerdXyToPos(p) : null;
    },
    getPieceCanMovePoses(type: string | number, pos: any, color: any) {
        const poses: any[] = [];
        mask[type].forEach((_pos: any[]) => {
            const p = this.convertMask(this.p(_pos[0], _pos[1]), pos, color);
            if (!jsis.isNull(p)) {
                poses.push(p);
            }
        });
        return poses;
    },
    getPieceCanMovePosesValid(type: any, pos: any, color: any, piecesString: any) {
        const _poses = this.getPieceCanMovePoses(type, pos, color);
        let p, distPiece;
        const poses = [];
        const n = _poses.length; const thisPos = this.nerdPosToXY(pos);
        for (let i = 0; i < n; i++) {
            p = this.nerdPosToXY(_poses[i]);
            distPiece = this.getPieceInPos(p.x, p.y, piecesString);
            if (distPiece.isValidPiece) {
                if (color === distPiece.color ||
                    (type === this.PIECE_TYPE_TREY && p.x === thisPos.x)) {
                    p = null;
                }
            } else {
                if (type === this.PIECE_TYPE_TREY && p.x !== thisPos.x) {
                    p = null;
                }
            }
            if (!jsis.isNull(p) && type === this.PIECE_TYPE_TOUK) {
                const _x = thisPos.x;
                const _y = thisPos.y;
                let _n, _s;
                if (p.x === thisPos.x) {
                    _n = Math.abs(p.y - thisPos.y);
                    _s = thisPos.y < p.y ? 1 : -1;
                    while (--_n > 0) {
                        if (this.getPieceInPos(_x, _y + _s * _n, piecesString).isValidPiece) {
                            p = null;
                            break;
                        }
                    }
                } else if (p.y === thisPos.y) {
                    _n = Math.abs(p.x - thisPos.x);
                    _s = thisPos.x < p.x ? 1 : -1;
                    while (--_n > 0) {
                        if (this.getPieceInPos(_x + _s * _n, _y, piecesString).isValidPiece) {
                            p = null;
                            break;
                        }
                    }
                }
            }
            if (!jsis.isNull(p)) {
                poses.push(_poses[i]);
            }
        }
        return poses;
    },
    replacePiecesString(piecesString: string, c: any, p: number) {
        return piecesString.substring(0, p) + c + piecesString.substring(p + 1);
    },
    injectPiece(piecesString: string, pos1: any, pos2: any) {
        const c = piecesString.charAt(pos1);
        if (!this.isCharPiecesInBoard(c, piecesString)) {
            return null;
        }
        piecesString = this.replacePiecesString(piecesString, this.EMPTY_PIECE, pos1);
        piecesString = this.replacePiecesString(piecesString, c, pos2);
        return piecesString;
    },
    getPieceCode(color: any, type: any) {
        const val = color + type;
        for (const k in pieceHash) {
            if (val === pieceHash[k]) {
                return k;
            }
        }
        return this.EMPTY_PIECE;
    },
    getKingWillInDanger(color: any, piecesString: string | any[]) {
        const kingPos = piecesString.indexOf(this.getPieceCode(color, this.PIECE_TYPE_SDECH));
        const n = piecesString.length;
        let _poses, p, j;
        for (let i = 0; i < n; i++) {
            p = this.getPieceInPos(i, piecesString);
            if (p.isValidPiece && p.color !== color && p.type === this.PIECE_TYPE_TOUK) {
                _poses = this.getPieceCanMovePoses(p.type, i, p.color, piecesString);
                for (j = 0; j < _poses.length; j++) {
                    if (_poses[j] === kingPos) {
                        return [this.numToCode(i), this.numToCode(kingPos)];
                    }
                }
            }
        }
        return null;
    },
    getKingInDanger(color: any, piecesString: string | any[]) {
        const kingPos = piecesString.indexOf(this.getPieceCode(color, this.PIECE_TYPE_SDECH));
        const n = piecesString.length;
        let _poses, p, j;
        for (let i = 0; i < n; i++) {
            p = this.getPieceInPos(i, piecesString);
            if (p.isValidPiece && p.color !== color) {
                _poses = this.getPieceCanMovePosesValid(p.type, i, p.color, piecesString);
                for (j = 0; j < _poses.length; j++) {
                    if (_poses[j] === kingPos) {
                        return [this.numToCode(i), this.numToCode(kingPos)];
                    }
                }
            }
        }
        return null;
    },
    numToCodeP(number: number) {
        return this.codeP(this.HORIZONTAL_CODE_LETTERS[number % 8], ((number / 8 | 0) + 1));
    },
    numToCode(number: any) {
        const codeP = this.numToCodeP(number);
        return `${codeP.h}${codeP.v}`;
    },
    generatePosesCanMove(type: any, pos: any, color: any, piecesString: any, isHaveMoved: any) {
        let p;
        const _poses = this.getPieceCanMovePosesValid(type, pos, color, piecesString);
        const isHaveCaptured = this.isHaveCaptured(piecesString);
        if (type === this.PIECE_TYPE_SDECH) {
            if (!isHaveCaptured && !isHaveMoved) {
                p = this.convertMask(this.p(2, 1), pos, color);
                if (p && !this.getPieceInPos(p, piecesString).isValidPiece) {
                    _poses.push(p);
                }
                p = this.convertMask(this.p(-2, 1), pos, color);
                if (p && !this.getPieceInPos(p, piecesString).isValidPiece) {
                    _poses.push(p);
                }
            }
        } else if (type === this.PIECE_TYPE_NEANG) {
            if (!isHaveCaptured && !isHaveMoved) {
                p = this.convertMask(this.p(-0, 2), pos, color);
                if (p && !this.getPieceInPos(p, piecesString).isValidPiece) {
                    _poses.push(p);
                }
            }
        }
        const n = _poses.length;
        const poses = [];
        let str;
        for (let i = 0; i < n; i++) {
            str = this.injectPiece(piecesString, pos, _poses[i]);
            if (jsis.isNull(this.getKingInDanger(color, str))) {
                poses.push(this.numToCode(_poses[i]));
            }
        }
        return poses;
    },
    isCharPiecesInBoard(c: any, piecesString: string | any[]) {
        return !!~piecesString.indexOf(c);
    },
    getPiecesInBoard(piecesString: string) {
        return piecesString.split('').filter((c: any) => {
            return this.isValidPiece(c);
        });
    },
    isHaveCaptured(piecesString: any) {
        return this.getPiecesInBoard(piecesString).length < ROW_NUMBER * 4;
    },
    filterPieceInBoard(piecesString: string) {
        const whitePieces = [];
        const blackPieces = [];
        let c, prop, piece;
        for (let i = 0; i < piecesString.length; i++) {
            c = piecesString.charAt(i);
            if (this.isValidPiece(c)) {
                prop = this.getPieceProperties(c);
                piece = {
                    color: prop.color,
                    type: prop.type,
                    index: i,
                    code: this.numToCode(i),
                };
                if (this.isWhite(piece.color)) {
                    whitePieces.push(piece);
                } else {
                    blackPieces.push(piece);
                }
            }
        }
        return {
            whitePieces: whitePieces,
            blackPieces: blackPieces,
        };
    },
    extractPiecesToArray(piecesString: { split: (arg0: string) => any; forEach: (arg0: (e: any) => void) => void; }) {
        piecesString = piecesString.split('');
        const pieceAll: { [x: string]: any[];[x: number]: undefined[]; } = {
            [PIECE_COLOR_BLACK]: [],
            [PIECE_COLOR_WHITE]: [],
        };
        piecesString.forEach((e: any) => {
            if (e === this.EMPTY_PIECE) {
                return;
            }
            const prop = this.getPieceProperties(e);
            pieceAll[prop.color].push(prop.type);
        });
        return pieceAll;
    },
    isStateCount(c: string | number, piecesString: any) {
        const allPieces = this.extractPiecesToArray(piecesString);
        return allPieces[c].length === 1;
    },
    checkCountable(color: string | number, piecesString: any) {
        const pieceAll = this.extractPiecesToArray(piecesString);
        const weaker = pieceAll[color];
        const stronger = pieceAll[this.oppositeColor(color)];
        return weaker.length <= 2 && stronger.length >= 2;
    },
    checkCount(color: string | number, piecesString: any, force: any) {
        const countChar = (str: { join: (arg0: string) => { (): any; new(): any; split: { (arg0: any): { (): any; new(): any; length: number; }; new(): any; }; }; }, c: any) => {
            return str.join('').split(c).length - 1;
        };
        const charExist = (str: string | any[], c: any) => {
            return !!~str.indexOf(c);
        };

        const pieceAll = this.extractPiecesToArray(piecesString);
        const weaker = pieceAll[color];
        const stronger = pieceAll[this.oppositeColor(color)];
        if (weaker.length === 1 && stronger.length > 1) {
            if (!charExist(stronger, this.PIECE_TYPE_TREY)) {
                let count = 64;
                const toukCount = countChar(stronger, this.PIECE_TYPE_TOUK);
                if (toukCount) {
                    count = toukCount > 1 ? 8 : 16;
                } else if (countChar(stronger, this.PIECE_TYPE_KOL) > 1) {
                    count = 22;
                } else if (countChar(stronger, this.PIECE_TYPE_SES) > 1) {
                    count = 32;
                } else if (countChar(stronger, this.PIECE_TYPE_KOL)) {
                    count = 44;
                }
                return [stronger.length + 1, count];
            }
            return [0, 64];
        } else if (force && this.checkCountable(color, piecesString)) {
            return [0, 64];
        }
        return null;
    },

    getHashKey(val: any) {
        const keys = Object.keys(pieceHash).filter((key) => {
            return pieceHash[key] === val;
        });
        return keys.length === 1 ? keys[0] : this.EMPTY_PIECE;
    },
    getPieceKeyByProp(prop: { color: any; type: any; }) {
        let prop1;
        for (const key in pieceHash) {
            prop1 = this.getPieceProperties(key);
            if (prop.color === prop1.color && prop.type === prop1.type) {
                return key;
            }
        }
        return this.EMPTY_PIECE;
    },
    getPieceKeyByName(name: any[]) {
        return this.getPieceKeyByProp({
            color: name[0],
            type: name[1],
        });
    },
    oppositeColor(color: any) {
        return this.isWhite(color) ? PIECE_COLOR_BLACK : PIECE_COLOR_WHITE;
    },
};

export default boardHelper;
