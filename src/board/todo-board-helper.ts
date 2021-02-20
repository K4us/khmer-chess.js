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
// TODO: make migration success
import jsis from './jsis';
import genMask from './gen-mask';
import Rectangle from './Rectangle';

export const PIECE_COLOR_WHITE = 'w';
export const PIECE_COLOR_BLACK = 'b';

export const PIECE_TYPE_TOUK = 'b'; // Boat
export const PIECE_TYPE_SES = 'h'; // Horse
export const PIECE_TYPE_KOL = 'g'; // General
export const PIECE_TYPE_SDECH = 'k'; // King
export const PIECE_TYPE_NEANG = 'q'; // Queen
export const PIECE_TYPE_TREY = 'f'; // Fish
export const PIECE_TYPE_BORK = 't'; // Transform fish
export const EMPTY_PIECE = '.';
export const PIECE_COLOR_EMPTY = '';
export const BOARD_SEPARATOR = '/';

export const HORIZONTAL_CODE_LETTERS = 'abcdefgh';
export const HORIZONTAL_NOTE_LETTERS = ['ក', 'ខ', 'គ', 'ឃ', 'ង', 'ច', 'ឆ', 'ជ'];
export const VERTICAL_NOTE_LETTERS = ['១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩', '១០',
    '១១', '១២', '១៣', '១៤', '១៥', '១៦', '១៧', '១៨', '១៩', '២០',
    '២១', '២២', '២៣', '២៤', '២៥', '២៦', '២៧', '២៨', '២៩', '៣០'];
export const HORIZONTAL_NOTE_LETTERS_ASCII = 'abcdefgh';
export const VERTICAL_NOTE_LETTERS_ASCII = Array.from({
    length: 30,
}, (_: any, i: number) => `${i + 1}`);

export const ROW_NUMBER = 8;
export const ROW_FIRST_INDEX = 0;
export const ROW_LAST_INDEX = 7;

let mask: any = null;

export function getPieceCharArray() {
    return [
        PIECE_TYPE_TOUK,
        PIECE_TYPE_SES,
        PIECE_TYPE_KOL,
        PIECE_TYPE_SDECH,
        PIECE_TYPE_NEANG,
        PIECE_TYPE_TREY,
        PIECE_TYPE_BORK,
    ];
}

export function getColorArray() {
    return [
        PIECE_COLOR_WHITE,
        PIECE_COLOR_BLACK,
    ];
}

let allPiecesString: string[] = null;
export function isValidPiecesString(str: string, onlyPiece?: boolean) {
    if (allPiecesString == null) {
        allPiecesString = [
            ...getPieceCharArray(),
            ...getPieceCharArray().map((c) => toWhitePiece(c)),
            EMPTY_PIECE,
            BOARD_SEPARATOR,
        ];
    }
    const ruler = onlyPiece ? allPiecesString.filter((c) => {
        return !~[EMPTY_PIECE, BOARD_SEPARATOR].indexOf(c);
    }) : allPiecesString;
    return !str.split('').some((c) => {
        return !~ruler.indexOf(c);
    });
}

export const toWhitePiece = (str: any) => str.toUpperCase();
export const toBlackPiece = (str: string) => str.toLowerCase();

export class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
class HvPont {
    h: string;
    v: number;
    constructor(h: string, v: number) {
        this.h = h;
        this.v = v;
    }
}
export const isValidPiece = (piece: string) => piece !== EMPTY_PIECE;
export const isWhite = (c: string) => c === PIECE_COLOR_WHITE;
export const isBlack = (c: string) => c === PIECE_COLOR_BLACK;
export const hvPoint = (h: string, v: number) => new HvPont(h, v);
export const p = (x: number, y: number) => new Point(x, y);
export const res = (width: number, height: number) => ({ width, height });
export const rect = (x: number, y: number, width: number, height: number) => {
    return new Rectangle(x, y, width, height);
};
export const getSubBoardNumber = () => ROW_NUMBER * ROW_NUMBER;
export const indexToPoint = (index: number) => {
    const x = index % ROW_NUMBER;
    const y = Math.floor(index / ROW_NUMBER);
    return new Point(x, y);
};
export const pointToIndex = (point: Point) => point.x + point.y * ROW_NUMBER;
export const indexCodeToIndex = (code: string) => {
    const x = HORIZONTAL_CODE_LETTERS.indexOf(code[0]);
    const y = Number(code[1]) - 1;
    return pointToIndex(new Point(x, y));
};
export const pointToIndexCode = (p: Point) => {
    return `${HORIZONTAL_CODE_LETTERS[p.x]}${p.y + 1}`;
};
export const indexToIndexCode = (index: number) => {
    const x = index % ROW_NUMBER;
    const y = Math.floor(index / ROW_NUMBER);
    return pointToIndexCode(new Point(x, y));
};
export const isPosInBoard = (posInBoard: number) => {
    return posInBoard >= 0 && posInBoard <= getSubBoardNumber() - 1;
};
export const getCharPieceFromString = (piecesString: string, posInBoard: number) => {
    if (isPosInBoard(posInBoard) && piecesString.length === getSubBoardNumber()) {
        return piecesString.charAt(posInBoard);
    }
    return EMPTY_PIECE;
};
type PieceProp = {
    color: string;
    type: string;
}
export const getPieceProperties = (code: string): PieceProp => {
    const h = pieceHash[code];
    return {
        color: h ? h[0] : PIECE_COLOR_EMPTY,
        type: h ? h[1] : EMPTY_PIECE,
    };
};
export const getCharPieceByIndex = (index: number, piecesString: string) => {
    return getCharPieceFromString(piecesString, index);
};
export const getPieceByPoint = (point: Point, piecesString: string) => {
    const piece = getCharPieceByIndex(pointToIndex(point), piecesString);
    let color = PIECE_COLOR_WHITE; let type = PIECE_TYPE_TREY;
    if (isValidPiece(piece)) {
        const pr = getPieceProperties(piece);
        color = pr.color;
        type = pr.type;
    }
    return {
        isValidPiece: isValidPiece(piece),
        color: color,
        type: type,
    };
};
export const getPieceByIndex = (index: number, piecesString: string) => {
    const piece = getCharPieceByIndex(index, piecesString);
    let color = PIECE_COLOR_WHITE; let type = PIECE_TYPE_TREY;
    if (isValidPiece(piece)) {
        const pr = getPieceProperties(piece);
        color = pr.color;
        type = pr.type;
    }
    return {
        isValidPiece: isValidPiece(piece),
        color: color,
        type: type,
    };
};
export const convertMask = (point1: Point, point2: Point, color: string) => {
    const sign = isWhite(color) ? 1 : -1;
    point1.x = point1.x * sign + point2.x;
    point1.y = point1.y * sign + point2.y;
    return pointToIndex(point1);
};
export const getPieceCanMovePoses = (type: string, index: number, color: string) => {
    const indices: number[] = [];
    mask = mask || genMask();
    mask[type].forEach((_pos: number[]) => {
        const point = indexToPoint(index);
        const p = convertMask(new Point(_pos[0], _pos[1]), point, color);
        indices.push(p);
    });
    return indices;
};
export const getPieceCanMovePosesValid = (type: string, point: Point, color: string, piecesString: string) => {
    const index = pointToIndex(point);
    const _poses = getPieceCanMovePoses(type, index, color);
    let p, distPiece;
    const poses = [];
    const n = _poses.length; const thisPos = indexToPoint(index);
    for (let i = 0; i < n; i++) {
        p = indexToPoint(_poses[i]);
        distPiece = getPieceByPoint(p, piecesString);
        if (distPiece.isValidPiece) {
            if (color === distPiece.color ||
                (type === PIECE_TYPE_TREY && p.x === thisPos.x)) {
                p = null;
            }
        } else {
            if (type === PIECE_TYPE_TREY && p.x !== thisPos.x) {
                p = null;
            }
        }
        if (!jsis.isNull(p) && type === PIECE_TYPE_TOUK) {
            const _x = thisPos.x;
            const _y = thisPos.y;
            let _n, _s;
            if (p.x === thisPos.x) {
                _n = Math.abs(p.y - thisPos.y);
                _s = thisPos.y < p.y ? 1 : -1;
                while (--_n > 0) {
                    if (getPieceByPoint(new Point(_x, _y + _s * _n), piecesString).isValidPiece) {
                        p = null;
                        break;
                    }
                }
            } else if (p.y === thisPos.y) {
                _n = Math.abs(p.x - thisPos.x);
                _s = thisPos.x < p.x ? 1 : -1;
                while (--_n > 0) {
                    if (getPieceByPoint(new Point(_x + _s * _n, _y), piecesString).isValidPiece) {
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
};
export const replacePiecesString = (piecesString: string, c: string, p: number) => {
    return piecesString.substring(0, p) + c + piecesString.substring(p + 1);
};
export const injectPiece = (piecesString: string, index1: number, index2: number) => {
    const c = piecesString.charAt(index1);
    if (!isCharPiecesInBoard(c, piecesString)) {
        return null;
    }
    piecesString = replacePiecesString(piecesString, EMPTY_PIECE, index1);
    piecesString = replacePiecesString(piecesString, c, index2);
    return piecesString;
};
export const getPieceCode = (color: string, type: string) => {
    const val = color + type;
    for (const k in pieceHash) {
        if (val === pieceHash[k]) {
            return k;
        }
    }
    return EMPTY_PIECE;
};
export const getKingWillInDanger = (color: string, piecesString: string) => {
    const kingPos = piecesString.indexOf(getPieceCode(color, PIECE_TYPE_SDECH));
    const n = piecesString.length;
    let _poses, p, j;
    for (let i = 0; i < n; i++) {
        p = getPieceByIndex(i, piecesString);
        if (p.isValidPiece && p.color !== color && p.type === PIECE_TYPE_TOUK) {
            _poses = getPieceCanMovePoses(p.type, i, p.color);
            for (j = 0; j < _poses.length; j++) {
                if (_poses[j] === kingPos) {
                    return [numToCode(i), numToCode(kingPos)];
                }
            }
        }
    }
    return null;
};
export const getKingInDanger = (color: string, piecesString: string) => {
    const kingPos = piecesString.indexOf(getPieceCode(color, PIECE_TYPE_SDECH));
    const n = piecesString.length;
    let _poses, p, j;
    for (let i = 0; i < n; i++) {
        p = getPieceByPoint(indexToPoint(i), piecesString);
        if (p.isValidPiece && p.color !== color) {
            _poses = getPieceCanMovePosesValid(p.type, indexToPoint(i), p.color, piecesString);
            for (j = 0; j < _poses.length; j++) {
                if (_poses[j] === kingPos) {
                    return [numToCode(i), numToCode(kingPos)];
                }
            }
        }
    }
    return null;
};
export const numToHVPont = (number: number) => {
    return new HvPont(HORIZONTAL_CODE_LETTERS[number % 8], ((number / 8 | 0) + 1));
};
export const numToCode = (number: number) => {
    const hvPoint = numToHVPont(number);
    return `${hvPoint.h}${hvPoint.v}`;
};
export const generatePosesCanMove = (type: string, point: Point, color: string,
    piecesString: string, isHaveMoved: boolean) => {
    let index;
    const _poses = getPieceCanMovePosesValid(type, point, color, piecesString);
    const captured = isHaveCaptured(piecesString);
    if (type === PIECE_TYPE_SDECH) {
        if (!captured && !isHaveMoved) {
            index = convertMask(new Point(2, 1), point, color);
            if (index && !getPieceByPoint(indexToPoint(index), piecesString).isValidPiece) {
                _poses.push(index);
            }
            index = convertMask(new Point(-2, 1), point, color);
            if (index && !getPieceByIndex(index, piecesString).isValidPiece) {
                _poses.push(index);
            }
        }
    } else if (type === PIECE_TYPE_NEANG) {
        if (!captured && !isHaveMoved) {
            index = convertMask(new Point(-0, 2), point, color);
            if (index && !getPieceByIndex(index, piecesString).isValidPiece) {
                _poses.push(index);
            }
        }
    }
    const n = _poses.length;
    const poses = [];
    let str;
    for (let i = 0; i < n; i++) {
        str = injectPiece(piecesString, pointToIndex(point), _poses[i]);
        if (jsis.isNull(getKingInDanger(color, str))) {
            poses.push(numToCode(_poses[i]));
        }
    }
    return poses;
};
export const isCharPiecesInBoard = (c: string, piecesString: string) => {
    return !!~piecesString.indexOf(c);
};
export const getPiecesInBoard = (piecesString: string) => {
    return piecesString.split('').filter((c) => {
        return isValidPiece(c);
    });
};
export const isHaveCaptured = (piecesString: string) => {
    return getPiecesInBoard(piecesString).length < ROW_NUMBER * 4;
};
export const filterPieceInBoard = (piecesString: string) => {
    const whitePieces = [];
    const blackPieces = [];
    let c, prop, piece;
    for (let i = 0; i < piecesString.length; i++) {
        c = piecesString.charAt(i);
        if (isValidPiece(c)) {
            prop = getPieceProperties(c);
            piece = {
                color: prop.color,
                type: prop.type,
                index: i,
                code: numToCode(i),
            };
            if (isWhite(piece.color)) {
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
};
export const extractPiecesToArray = (piecesString: string) => {
    const arr = piecesString.split('');
    const pieceAll: { [key: string]: string[] } = {
        [PIECE_COLOR_BLACK]: [],
        [PIECE_COLOR_WHITE]: [],
    };
    arr.forEach((e) => {
        if (e === EMPTY_PIECE) {
            return;
        }
        const prop: PieceProp = getPieceProperties(e);
        pieceAll[prop.color].push(prop.type);
    });
    return pieceAll;
};
export const isStateCount = (c: number, piecesString: string) => {
    const allPieces = extractPiecesToArray(piecesString);
    const l: number = allPieces[c].length;
    return l === 1;
};
export const checkCountable = (color: string, piecesString: string) => {
    const pieceAll = extractPiecesToArray(piecesString);
    const weaker = pieceAll[color];
    const stronger = pieceAll[oppositeColor(color)];
    return weaker.length <= 2 && stronger.length >= 2;
};
export const checkCount = (color: string, piecesString: string, force: any) => {
    const countChar = (str: any, c: string) => str.join('').split(c).length - 1;
    const charExist = (str: string | any[], c: string) => {
        return !!~str.indexOf(c);
    };

    const pieceAll = extractPiecesToArray(piecesString);
    const weaker = pieceAll[color];
    const stronger = pieceAll[oppositeColor(color)];
    const l: number = weaker.length;
    if (l === 1 && stronger.length > 1) {
        if (!charExist(stronger, PIECE_TYPE_TREY)) {
            let count = 64;
            const toukCount = countChar(stronger, PIECE_TYPE_TOUK);
            if (toukCount) {
                count = toukCount > 1 ? 8 : 16;
            } else if (countChar(stronger, PIECE_TYPE_KOL) > 1) {
                count = 22;
            } else if (countChar(stronger, PIECE_TYPE_SES) > 1) {
                count = 32;
            } else if (countChar(stronger, PIECE_TYPE_KOL)) {
                count = 44;
            }
            return [stronger.length + 1, count];
        }
        return [0, 64];
    } else if (force && checkCountable(color, piecesString)) {
        return [0, 64];
    }
    return null;
};

export const getHashKey = (val: string) => {
    const keys = Object.keys(pieceHash).filter((key) => {
        return pieceHash[key] === val;
    });
    return keys.length === 1 ? keys[0] : EMPTY_PIECE;
};
export const getPieceKeyByProp = (prop: PieceProp) => {
    let prop1;
    for (const key in pieceHash) {
        prop1 = getPieceProperties(key);
        if (prop.color === prop1.color && prop.type === prop1.type) {
            return key;
        }
    }
    return EMPTY_PIECE;
};
export const getPieceKeyByName = (name: string) => {
    return getPieceKeyByProp({
        color: name[0],
        type: name[1],
    });
};

export const oppositeColor = (color: string) => {
    return isWhite(color) ? PIECE_COLOR_BLACK : PIECE_COLOR_WHITE;
};
export const pieceHash: { [key: string]: string } = {
    a: `${PIECE_COLOR_WHITE}${PIECE_TYPE_TOUK}`,
    b: `${PIECE_COLOR_WHITE}${PIECE_TYPE_SES}`,
    c: `${PIECE_COLOR_WHITE}${PIECE_TYPE_KOL}`,
    d: `${PIECE_COLOR_WHITE}${PIECE_TYPE_SDECH}`,
    e: `${PIECE_COLOR_WHITE}${PIECE_TYPE_NEANG}`,
    f: `${PIECE_COLOR_WHITE}${PIECE_TYPE_TREY}`,
    g: `${PIECE_COLOR_WHITE}${PIECE_TYPE_BORK}`,
    h: `${PIECE_COLOR_BLACK}${PIECE_TYPE_TOUK}`,
    i: `${PIECE_COLOR_BLACK}${PIECE_TYPE_SES}`,
    j: `${PIECE_COLOR_BLACK}${PIECE_TYPE_KOL}`,
    k: `${PIECE_COLOR_BLACK}${PIECE_TYPE_SDECH}`,
    l: `${PIECE_COLOR_BLACK}${PIECE_TYPE_NEANG}`,
    m: `${PIECE_COLOR_BLACK}${PIECE_TYPE_TREY}`,
    n: `${PIECE_COLOR_BLACK}${PIECE_TYPE_BORK}`,
};
