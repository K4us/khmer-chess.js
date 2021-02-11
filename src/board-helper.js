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
 *----------------------------------------------------------------------------*/

"use strict";

const jsis = require("./jsis");
const genMask = require("./gen-mask");

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    isContainsPoint(point) {
        const { x, y } = point;
        const isContainsPoint = this.x <= x &&
            (this.x + this.width) >= x &&
            this.y <= y &&
            (this.y + this.height) >= y;
        return isContainsPoint;
    }
}

const boardHelper = {
    HORIZONTAL_CODE_LETTERS: "abcdefgh",

    PIECE_COLOR_WHITE: "w",
    PIECE_COLOR_BLACK: "b",

    PIECE_TYPE_TOUK: "a", // Boat
    PIECE_TYPE_SES: "b", // Horse
    PIECE_TYPE_KOL: "c", // General
    PIECE_TYPE_SDECH: "d", // King
    PIECE_TYPE_NEANG: "e", // Queen
    PIECE_TYPE_TREY: "f", // Fish
    PIECE_TYPE_BORK: "g", // Flipped fish
    EMPTY_PIECE: "o",

    ROW_NUMBER: 8,
    ROW_FIRST_INDEX: 0,
    ROW_LAST_INDEX: 7,

    mask: null,

    isValidPosXY(point, y) {
        if (jsis.isUndefined(point)) {
            return false;
        }
        if (!jsis.isUndefined(y)) {
            point = this.p(point, y);
        }
        return !jsis.isUndefined(point.x) && !jsis.isUndefined(point.y) &&
            this.rect(0, 0, this.ROW_LAST_INDEX, this.ROW_LAST_INDEX).isContainsPoint(point);
    },
    isValidPiece(piece) {
        return piece != this.EMPTY_PIECE;
    },
    isWhite(c) {
        return c === this.PIECE_COLOR_WHITE;
    },
    isBlack(c) {
        return c === this.PIECE_COLOR_BLACK;
    },
    p(x, y) {
        return {
            x,
            y,
        };
    },
    res(width, height) {
        return {
            width,
            height,
        };
    },
    rect(x, y, width, height) {
        return new Rectangle(x, y, width, height);
    },
    getSubBoardNumber() {
        return this.ROW_NUMBER * this.ROW_NUMBER;
    },
    nerdPosToXY(p) {
        return jsis.isNumber(p.x) && jsis.isNumber(p.y) ? p : (jsis.isNumber(p) ? this.p(p % this.ROW_NUMBER, Math.floor(p / this.ROW_NUMBER)) : null);
    },
    nerdXyToPos(point, y) {
        if (!jsis.isUndefined(y)) {
            return point + y * this.ROW_NUMBER;
        }
        return point.x + point.y * this.ROW_NUMBER;
    },
    isPosInBoard(posInBoard) {
        return jsis.isNumber(posInBoard) &&
            posInBoard >= 0 && posInBoard <= this.getSubBoardNumber() - 1;
    },
    getCharPieceFromString(piecesString, posInBoard) {
        if (this.isPosInBoard(posInBoard) && piecesString.length === this.getSubBoardNumber()) {
            return piecesString.charAt(posInBoard);
        }
        return this.EMPTY_PIECE;
    },
    getPieceProperties(code) {
        const h = this.pieceHash[code];
        return {
            color: h ? h[0] : this.PIECE_COLOR_EMPTY,
            type: h ? h[1] : this.EMPTY_PIECE,
        };
    },
    getCharPieceInPos(posInBoard, piecesString) {
        return this.getCharPieceFromString(piecesString, posInBoard);
    },
    getPieceInPos(posInBoard, y, piecesString) {
        if (jsis.isNumber(y)) {
            posInBoard = this.nerdXyToPos(posInBoard, y);
        } else if (jsis.isString(y)) {
            piecesString = y;
        }
        const piece = this.getCharPieceInPos(posInBoard, piecesString);
        let color = this.PIECE_COLOR_WHITE, type = this.PIECE_TYPE_TREY;
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
    convertMask(p, pos, color) {
        const sign = this.isWhite(color) ? 1 : -1;
        pos = this.nerdPosToXY(pos);
        p.x = p.x * sign + pos.x;
        p.y = p.y * sign + pos.y;
        return this.isValidPosXY(p) ? this.nerdXyToPos(p) : null;
    },
    getPieceCanMovePoses(type, pos, color) {
        const poses = [];
        this.mask = this.mask || genMask(this);
        this.mask[type].forEach((_pos) => {
            const p = this.convertMask(this.p(_pos[0], _pos[1]), pos, color);
            if (!jsis.isNull(p)) {
                poses.push(p);
            }
        });
        return poses;
    },
    getPieceCanMovePosesValid(type, pos, color, piecesString) {
        const _poses = this.getPieceCanMovePoses(type, pos, color);
        let p, distPiece;
        const poses = [];
        const n = _poses.length, thisPos = this.nerdPosToXY(pos);
        for (let i = 0; i < n; i++) {
            p = this.nerdPosToXY(_poses[i]);
            distPiece = this.getPieceInPos(p.x, p.y, piecesString);
            if (distPiece.isValidPiece) {
                if (color === distPiece.color ||
                    type === this.PIECE_TYPE_TREY && p.x === thisPos.x) {
                    p = null;
                }
            } else {
                if (type === this.PIECE_TYPE_TREY && p.x != thisPos.x) {
                    p = null;
                }
            }
            if (!jsis.isNull(p) && type === this.PIECE_TYPE_TOUK) {
                const _x = thisPos.x,
                    _y = thisPos.y;
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
    replacePiecesString(piecesString, c, p) {
        return piecesString.substring(0, p) + c + piecesString.substring(p + 1);
    },
    injectPiece(piecesString, pos1, pos2) {
        const c = piecesString.charAt(pos1);
        if (!this.isCharPiecesInBoard(c, piecesString)) {
            return null;
        }
        piecesString = this.replacePiecesString(piecesString, this.EMPTY_PIECE, pos1);
        piecesString = this.replacePiecesString(piecesString, c, pos2);
        return piecesString;
    },
    getPieceCode(color, type) {
        const val = color + type;
        for (const k in this.pieceHash) {
            if (val === this.pieceHash[k]) {
                return k;
            }
        }
        return this.EMPTY_PIECE;
    },
    getKingWillInDanger(color, piecesString) {
        const kingPos = piecesString.indexOf(this.getPieceCode(color, this.PIECE_TYPE_SDECH));
        const n = piecesString.length;
        let _poses, p, j;
        for (let i = 0; i < n; i++) {
            p = this.getPieceInPos(i, piecesString);
            if (p.isValidPiece && p.color != color && p.type === this.PIECE_TYPE_TOUK) {
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
    getKingInDanger(color, piecesString) {
        const kingPos = piecesString.indexOf(this.getPieceCode(color, this.PIECE_TYPE_SDECH));
        const n = piecesString.length;
        let _poses, p, j;
        for (let i = 0; i < n; i++) {
            p = this.getPieceInPos(i, piecesString);
            if (p.isValidPiece && p.color != color) {
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
    numToCode(number) {
        return this.HORIZONTAL_CODE_LETTERS[number % 8] + ((number / 8 | 0) + 1);
    },
    generatePosesCanMove(type, pos, color, piecesString, isHaveMoved) {
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
    isCharPiecesInBoard(c, piecesString) {
        return !!~piecesString.indexOf(c);
    },
    getPiecesInBoard(piecesString) {
        return piecesString.split("").filter((c) => {
            return this.isValidPiece(c);
        });
    },
    isHaveCaptured(piecesString) {
        return this.getPiecesInBoard(piecesString).length < this.ROW_NUMBER * 4;
    },
    filterPieceInBoard(piecesString) {
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
    extractPiecesToArray(piecesString) {
        piecesString = piecesString.split("");
        const pieceAll = {
            [this.PIECE_COLOR_BLACK]: [],
            [this.PIECE_COLOR_WHITE]: [],
        };
        piecesString.forEach((e) => {
            if (e === this.EMPTY_PIECE) {
                return;
            }
            const prop = this.getPieceProperties(e);
            pieceAll[prop.color].push(prop.type);
        });
        return pieceAll;
    },
    isStateCount(c, piecesString) {
        const allPieces = this.extractPiecesToArray(piecesString);
        return allPieces[c].length === 1;
    },
    checkCountable(color, piecesString) {
        const pieceAll = this.extractPiecesToArray(piecesString);
        const weaker = pieceAll[color];
        const stronger = pieceAll[this.oppositeColor(color)];
        return weaker.length <= 2 && stronger.length >= 2;
    },
    checkCount(color, piecesString, force) {
        const countChar = (str, c) => {
            return str.join("").split(c).length - 1;
        };
        const charExist = (str, c) => {
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

    getHashKey(val) {
        const keys = Object.keys(this.pieceHash).filter((key) => {
            return this.pieceHash[key] === val;
        });
        return keys.length === 1 ? keys[0] : this.EMPTY_PIECE;
    },
    getPieceKeyByProp(prop) {
        let prop1;
        for (const key in this.pieceHash) {
            prop1 = this.getPieceProperties(key);
            if (prop.color === prop1.color && prop.type === prop1.type) {
                return key;
            }
        }
        return this.EMPTY_PIECE;
    },
    getPieceKeyByName(name) {
        return this.getPieceKeyByProp({
            color: name[0],
            type: name[1],
        });
    },
    oppositeColor(color) {
        return this.isWhite(color) ? this.PIECE_COLOR_BLACK : this.PIECE_COLOR_WHITE;
    },
};
boardHelper.pieceHash = {
    "a": boardHelper.PIECE_COLOR_WHITE + boardHelper.PIECE_TYPE_TOUK,
    "b": boardHelper.PIECE_COLOR_WHITE + boardHelper.PIECE_TYPE_SES,
    "c": boardHelper.PIECE_COLOR_WHITE + boardHelper.PIECE_TYPE_KOL,
    "d": boardHelper.PIECE_COLOR_WHITE + boardHelper.PIECE_TYPE_SDECH,
    "e": boardHelper.PIECE_COLOR_WHITE + boardHelper.PIECE_TYPE_NEANG,
    "f": boardHelper.PIECE_COLOR_WHITE + boardHelper.PIECE_TYPE_TREY,
    "g": boardHelper.PIECE_COLOR_WHITE + boardHelper.PIECE_TYPE_BORK,
    "h": boardHelper.PIECE_COLOR_BLACK + boardHelper.PIECE_TYPE_TOUK,
    "i": boardHelper.PIECE_COLOR_BLACK + boardHelper.PIECE_TYPE_SES,
    "j": boardHelper.PIECE_COLOR_BLACK + boardHelper.PIECE_TYPE_KOL,
    "k": boardHelper.PIECE_COLOR_BLACK + boardHelper.PIECE_TYPE_SDECH,
    "l": boardHelper.PIECE_COLOR_BLACK + boardHelper.PIECE_TYPE_NEANG,
    "m": boardHelper.PIECE_COLOR_BLACK + boardHelper.PIECE_TYPE_TREY,
    "n": boardHelper.PIECE_COLOR_BLACK + boardHelper.PIECE_TYPE_BORK,
};

module.exports = boardHelper;