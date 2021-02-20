"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var jsis_1 = __importDefault(require("./jsis"));
var genMask_1 = __importDefault(require("./genMask"));
var constant_1 = require("./constant");
var todo_board_helper_1 = require("./todo-board-helper");
var Rectangle_1 = __importDefault(require("./Rectangle"));
var Point_1 = __importDefault(require("./Point"));
var mask = genMask_1.default();
var allPiecesString = null;
var BoardHelper = /** @class */ (function () {
    function BoardHelper() {
    }
    BoardHelper.prototype.getPieceCharArray = function () {
        return [
            constant_1.PIECE_TYPE_TOUK,
            constant_1.PIECE_TYPE_SES,
            constant_1.PIECE_TYPE_KOL,
            constant_1.PIECE_TYPE_SDECH,
            constant_1.PIECE_TYPE_NEANG,
            constant_1.PIECE_TYPE_TREY,
            constant_1.PIECE_TYPE_BORK,
        ];
    };
    BoardHelper.prototype.getColorArray = function () {
        return [
            constant_1.PIECE_COLOR_WHITE,
            constant_1.PIECE_COLOR_BLACK,
        ];
    };
    BoardHelper.prototype.isValidPiecesString = function (str, onlyPiece) {
        var _this = this;
        if (jsis_1.default.isNull(allPiecesString)) {
            allPiecesString = __spreadArrays(this.getPieceCharArray(), this.getPieceCharArray().map(function (c) { return _this.toWhitePiece(c); }), [
                constant_1.EMPTY_PIECE,
                constant_1.BOARD_SEPARATOR,
            ]);
        }
        var ruler = onlyPiece ? allPiecesString.filter(function (c) {
            return !~[constant_1.EMPTY_PIECE, constant_1.BOARD_SEPARATOR].indexOf(c);
        }) : allPiecesString;
        return !str.split('').some(function (c) {
            return !~ruler.indexOf(c);
        });
    };
    BoardHelper.prototype.toWhitePiece = function (str) {
        return str.toUpperCase();
    };
    BoardHelper.prototype.toBlackPiece = function (str) {
        return str.toLowerCase();
    };
    BoardHelper.prototype.isValidPosXY = function (point, y) {
        if (jsis_1.default.isUndefined(point)) {
            return false;
        }
        if (!jsis_1.default.isUndefined(y)) {
            point = new Point_1.default(point, y);
        }
        var newPoint = point;
        return !jsis_1.default.isUndefined(newPoint.x) && !jsis_1.default.isUndefined(newPoint.y) &&
            this.rect(0, 0, constant_1.ROW_LAST_INDEX, constant_1.ROW_LAST_INDEX).isContainsPoint(newPoint);
    };
    BoardHelper.prototype.isValidPiece = function (piece) {
        return piece !== constant_1.EMPTY_PIECE;
    };
    BoardHelper.prototype.isWhite = function (c) {
        return c === constant_1.PIECE_COLOR_WHITE;
    };
    BoardHelper.prototype.isBlack = function (c) {
        return c === constant_1.PIECE_COLOR_BLACK;
    };
    BoardHelper.prototype.codeP = function (h, v) {
        return ({ h: h, v: v });
    };
    BoardHelper.prototype.p = function (x, y) {
        return ({ x: x, y: y });
    };
    BoardHelper.prototype.res = function (width, height) {
        return ({ width: width, height: height });
    };
    BoardHelper.prototype.rect = function (x, y, width, height) {
        return new Rectangle_1.default(x, y, width, height);
    };
    BoardHelper.prototype.getSubBoardNumber = function () {
        return constant_1.ROW_NUMBER * constant_1.ROW_NUMBER;
    };
    BoardHelper.prototype.nerdPosToXY = function (p) {
        if (jsis_1.default.isNumber(p.x) && jsis_1.default.isNumber(p.y)) {
            return p;
        }
        if (jsis_1.default.isNumber(p)) {
            var x = p % constant_1.ROW_NUMBER;
            var y = Math.floor(p / constant_1.ROW_NUMBER);
            return new Point_1.default(x, y);
        }
        return null;
    };
    BoardHelper.prototype.nerdXyToPos = function (x, y) {
        if (!jsis_1.default.isUndefined(y)) {
            return x + y * constant_1.ROW_NUMBER;
        }
        return x.x + x.y * constant_1.ROW_NUMBER;
    };
    BoardHelper.prototype.indexCodeToPos = function (code) {
        var x = constant_1.HORIZONTAL_CODE_LETTERS.indexOf(code[0]);
        var y = Number(code[1]) - 1;
        return this.nerdXyToPos(x, y);
    };
    BoardHelper.prototype.pointToIndexCode = function (p) {
        return "" + constant_1.HORIZONTAL_CODE_LETTERS[p.x] + (p.y + 1);
    };
    BoardHelper.prototype.xyToIndexCode = function (x, y) {
        return this.pointToIndexCode(new Point_1.default(x, y));
    };
    BoardHelper.prototype.posToIndexCode = function (p) {
        if (jsis_1.default.isNumber(p.x) && jsis_1.default.isNumber(p.y)) {
            return this.pointToIndexCode(p);
        }
        if (jsis_1.default.isNumber(p)) {
            var x = p % constant_1.ROW_NUMBER;
            var y = Math.floor(p / constant_1.ROW_NUMBER);
            return this.xyToIndexCode(x, y);
        }
        return null;
    };
    BoardHelper.prototype.isPosInBoard = function (posInBoard) {
        return jsis_1.default.isNumber(posInBoard) &&
            posInBoard >= 0 && posInBoard <= this.getSubBoardNumber() - 1;
    };
    BoardHelper.prototype.getCharPieceFromString = function (piecesString, posInBoard) {
        if (this.isPosInBoard(posInBoard) && piecesString.length === this.getSubBoardNumber()) {
            return piecesString.charAt(posInBoard);
        }
        return constant_1.EMPTY_PIECE;
    };
    BoardHelper.prototype.getPieceProperties = function (code) {
        var h = constant_1.pieceHash[code];
        return {
            color: h ? h[0] : todo_board_helper_1.PIECE_COLOR_EMPTY,
            type: h ? h[1] : constant_1.EMPTY_PIECE,
        };
    };
    BoardHelper.prototype.getCharPieceInPos = function (posInBoard, piecesString) {
        return this.getCharPieceFromString(piecesString, posInBoard);
    };
    BoardHelper.prototype.getPieceInPos = function (posInBoard, y, piecesString) {
        if (jsis_1.default.isNumber(y)) {
            posInBoard = this.nerdXyToPos(posInBoard, y);
        }
        else if (jsis_1.default.isString(y)) {
            piecesString = y;
        }
        var piece = this.getCharPieceInPos(posInBoard, piecesString);
        var color = constant_1.PIECE_COLOR_WHITE;
        var type = constant_1.PIECE_TYPE_TREY;
        if (this.isValidPiece(piece)) {
            var pr = this.getPieceProperties(piece);
            color = pr.color;
            type = pr.type;
        }
        return {
            isValidPiece: this.isValidPiece(piece),
            color: color,
            type: type,
        };
    };
    BoardHelper.prototype.convertMask = function (p, pos, color) {
        var sign = this.isWhite(color) ? 1 : -1;
        pos = this.nerdPosToXY(pos);
        p.x = p.x * sign + pos.x;
        p.y = p.y * sign + pos.y;
        return this.isValidPosXY(p) ? this.nerdXyToPos(p) : null;
    };
    BoardHelper.prototype.getPieceCanMovePoses = function (type, pos, color) {
        var _this = this;
        var poses = [];
        mask[type].forEach(function (_pos) {
            var p = _this.convertMask(new Point_1.default(_pos[0], _pos[1]), pos, color);
            if (!jsis_1.default.isNull(p)) {
                poses.push(p);
            }
        });
        return poses;
    };
    BoardHelper.prototype.getPieceCanMovePosesValid = function (type, pos, color, piecesString) {
        var _poses = this.getPieceCanMovePoses(type, pos, color);
        var p, distPiece;
        var poses = [];
        var n = _poses.length;
        var thisPos = this.nerdPosToXY(pos);
        for (var i = 0; i < n; i++) {
            p = this.nerdPosToXY(_poses[i]);
            distPiece = this.getPieceInPos(p.x, p.y, piecesString);
            if (distPiece.isValidPiece) {
                if (color === distPiece.color ||
                    (type === constant_1.PIECE_TYPE_TREY && p.x === thisPos.x)) {
                    p = null;
                }
            }
            else {
                if (type === constant_1.PIECE_TYPE_TREY && p.x !== thisPos.x) {
                    p = null;
                }
            }
            if (!jsis_1.default.isNull(p) && type === constant_1.PIECE_TYPE_TOUK) {
                var _x = thisPos.x;
                var _y = thisPos.y;
                var _n = void 0, _s = void 0;
                if (p.x === thisPos.x) {
                    _n = Math.abs(p.y - thisPos.y);
                    _s = thisPos.y < p.y ? 1 : -1;
                    while (--_n > 0) {
                        if (this.getPieceInPos(_x, _y + _s * _n, piecesString).isValidPiece) {
                            p = null;
                            break;
                        }
                    }
                }
                else if (p.y === thisPos.y) {
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
            if (!jsis_1.default.isNull(p)) {
                poses.push(_poses[i]);
            }
        }
        return poses;
    };
    BoardHelper.prototype.replacePiecesString = function (piecesString, c, p) {
        return piecesString.substring(0, p) + c + piecesString.substring(p + 1);
    };
    BoardHelper.prototype.injectPiece = function (piecesString, pos1, pos2) {
        var c = piecesString.charAt(pos1);
        if (!this.isCharPiecesInBoard(c, piecesString)) {
            return null;
        }
        piecesString = this.replacePiecesString(piecesString, constant_1.EMPTY_PIECE, pos1);
        piecesString = this.replacePiecesString(piecesString, c, pos2);
        return piecesString;
    };
    BoardHelper.prototype.getPieceCode = function (color, type) {
        var val = color + type;
        for (var k in constant_1.pieceHash) {
            if (val === constant_1.pieceHash[k]) {
                return k;
            }
        }
        return constant_1.EMPTY_PIECE;
    };
    BoardHelper.prototype.getKingWillInDanger = function (color, piecesString) {
        var kingPos = piecesString.indexOf(this.getPieceCode(color, constant_1.PIECE_TYPE_SDECH));
        var n = piecesString.length;
        var _poses, p, j;
        for (var i = 0; i < n; i++) {
            p = this.getPieceInPos(i, piecesString);
            if (p.isValidPiece && p.color !== color && p.type === constant_1.PIECE_TYPE_TOUK) {
                _poses = this.getPieceCanMovePoses(p.type, i, p.color);
                for (j = 0; j < _poses.length; j++) {
                    if (_poses[j] === kingPos) {
                        return [this.numToCode(i), this.numToCode(kingPos)];
                    }
                }
            }
        }
        return null;
    };
    BoardHelper.prototype.getKingInDanger = function (color, piecesString) {
        var kingPos = piecesString.indexOf(this.getPieceCode(color, constant_1.PIECE_TYPE_SDECH));
        var n = piecesString.length;
        var _poses, p, j;
        for (var i = 0; i < n; i++) {
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
    };
    BoardHelper.prototype.numToCodeP = function (number) {
        return this.codeP(constant_1.HORIZONTAL_CODE_LETTERS[number % 8], ((number / 8 | 0) + 1));
    };
    BoardHelper.prototype.numToCode = function (number) {
        var codeP = this.numToCodeP(number);
        return "" + codeP.h + codeP.v;
    };
    BoardHelper.prototype.generatePosesCanMove = function (type, pos, color, piecesString, isHaveMoved) {
        var p;
        var _poses = this.getPieceCanMovePosesValid(type, pos, color, piecesString);
        var isHaveCaptured = this.isHaveCaptured(piecesString);
        if (type === constant_1.PIECE_TYPE_SDECH) {
            if (!isHaveCaptured && !isHaveMoved) {
                p = this.convertMask(new Point_1.default(2, 1), pos, color);
                if (p && !this.getPieceInPos(p, piecesString).isValidPiece) {
                    _poses.push(p);
                }
                p = this.convertMask(new Point_1.default(-2, 1), pos, color);
                if (p && !this.getPieceInPos(p, piecesString).isValidPiece) {
                    _poses.push(p);
                }
            }
        }
        else if (type === constant_1.PIECE_TYPE_NEANG) {
            if (!isHaveCaptured && !isHaveMoved) {
                p = this.convertMask(new Point_1.default(-0, 2), pos, color);
                if (p && !this.getPieceInPos(p, piecesString).isValidPiece) {
                    _poses.push(p);
                }
            }
        }
        var n = _poses.length;
        var poses = [];
        var str;
        for (var i = 0; i < n; i++) {
            str = this.injectPiece(piecesString, pos, _poses[i]);
            if (jsis_1.default.isNull(this.getKingInDanger(color, str))) {
                poses.push(this.numToCode(_poses[i]));
            }
        }
        return poses;
    };
    BoardHelper.prototype.isCharPiecesInBoard = function (c, piecesString) {
        return !!~piecesString.indexOf(c);
    };
    BoardHelper.prototype.getPiecesInBoard = function (piecesString) {
        var _this = this;
        return piecesString.split('').filter(function (c) {
            return _this.isValidPiece(c);
        });
    };
    BoardHelper.prototype.isHaveCaptured = function (piecesString) {
        return this.getPiecesInBoard(piecesString).length < constant_1.ROW_NUMBER * 4;
    };
    BoardHelper.prototype.filterPieceInBoard = function (piecesString) {
        var whitePieces = [];
        var blackPieces = [];
        var c, prop, piece;
        for (var i = 0; i < piecesString.length; i++) {
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
                }
                else {
                    blackPieces.push(piece);
                }
            }
        }
        return {
            whitePieces: whitePieces,
            blackPieces: blackPieces,
        };
    };
    BoardHelper.prototype.extractPiecesToArray = function (piecesString) {
        var _a;
        var _this = this;
        piecesString = piecesString.split('');
        var pieceAll = (_a = {},
            _a[constant_1.PIECE_COLOR_BLACK] = [],
            _a[constant_1.PIECE_COLOR_WHITE] = [],
            _a);
        piecesString.forEach(function (e) {
            if (e === constant_1.EMPTY_PIECE) {
                return;
            }
            var prop = _this.getPieceProperties(e);
            pieceAll[prop.color].push(prop.type);
        });
        return pieceAll;
    };
    BoardHelper.prototype.isStateCount = function (c, piecesString) {
        var allPieces = this.extractPiecesToArray(piecesString);
        return allPieces[c].length === 1;
    };
    BoardHelper.prototype.checkCountable = function (color, piecesString) {
        var pieceAll = this.extractPiecesToArray(piecesString);
        var weaker = pieceAll[color];
        var stronger = pieceAll[this.oppositeColor(color)];
        return weaker.length <= 2 && stronger.length >= 2;
    };
    BoardHelper.prototype.checkCount = function (color, piecesString, force) {
        var countChar = function (str, c) {
            return str.join('').split(c).length - 1;
        };
        var charExist = function (str, c) {
            return !!~str.indexOf(c);
        };
        var pieceAll = this.extractPiecesToArray(piecesString);
        var weaker = pieceAll[color];
        var stronger = pieceAll[this.oppositeColor(color)];
        if (weaker.length === 1 && stronger.length > 1) {
            if (!charExist(stronger, constant_1.PIECE_TYPE_TREY)) {
                var count = 64;
                var toukCount = countChar(stronger, constant_1.PIECE_TYPE_TOUK);
                if (toukCount) {
                    count = toukCount > 1 ? 8 : 16;
                }
                else if (countChar(stronger, constant_1.PIECE_TYPE_KOL) > 1) {
                    count = 22;
                }
                else if (countChar(stronger, constant_1.PIECE_TYPE_SES) > 1) {
                    count = 32;
                }
                else if (countChar(stronger, constant_1.PIECE_TYPE_KOL)) {
                    count = 44;
                }
                return [stronger.length + 1, count];
            }
            return [0, 64];
        }
        else if (force && this.checkCountable(color, piecesString)) {
            return [0, 64];
        }
        return null;
    };
    BoardHelper.prototype.getHashKey = function (val) {
        var keys = Object.keys(constant_1.pieceHash).filter(function (key) {
            return constant_1.pieceHash[key] === val;
        });
        return keys.length === 1 ? keys[0] : constant_1.EMPTY_PIECE;
    };
    BoardHelper.prototype.getPieceKeyByProp = function (prop) {
        var prop1;
        for (var key in constant_1.pieceHash) {
            prop1 = this.getPieceProperties(key);
            if (prop.color === prop1.color && prop.type === prop1.type) {
                return key;
            }
        }
        return constant_1.EMPTY_PIECE;
    };
    BoardHelper.prototype.getPieceKeyByName = function (name) {
        return this.getPieceKeyByProp({
            color: name[0],
            type: name[1],
        });
    };
    BoardHelper.prototype.oppositeColor = function (color) {
        return this.isWhite(color) ? constant_1.PIECE_COLOR_BLACK : constant_1.PIECE_COLOR_WHITE;
    };
    return BoardHelper;
}());
;
exports.default = new BoardHelper();
