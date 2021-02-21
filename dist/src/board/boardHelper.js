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
var Rectangle_1 = __importDefault(require("./Rectangle"));
var index_1 = require("../ren/index");
var mask = genMask_1.default();
var allPiecesString = null;
var BoardHelper = /** @class */ (function () {
    function BoardHelper() {
    }
    BoardHelper.prototype.isValidPiecesString = function (str, onlyPiece) {
        if (jsis_1.default.isNull(allPiecesString)) {
            allPiecesString = __spreadArrays(index_1.Piece.getPieceCharArray(), index_1.Piece.getPieceCharArray().map(function (c) {
                return index_1.Piece.toWhiteCharCode(c);
            }), [
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
    BoardHelper.prototype.getCharPieceFromString = function (piecesString, index) {
        if (index_1.Point.isIndexInBoard(index) && piecesString.length === constant_1.CELL_COUNT) {
            return piecesString.charAt(index);
        }
        return constant_1.EMPTY_PIECE;
    };
    BoardHelper.prototype.getPieceProperties = function (pieceCode) {
        var h = constant_1.pieceHash[pieceCode];
        return {
            color: h ? h[0] : constant_1.PIECE_COLOR_EMPTY,
            type: h ? h[1] : constant_1.EMPTY_PIECE,
        };
    };
    BoardHelper.prototype.getCharPieceInPos = function (index, piecesString) {
        return this.getCharPieceFromString(piecesString, index);
    };
    BoardHelper.prototype.getPieceByIndex = function (index, piecesString) {
        var piece = this.getCharPieceInPos(index, piecesString);
        var color = constant_1.PIECE_COLOR_WHITE;
        var type = constant_1.PIECE_TYPE_TREY;
        if (index_1.Piece.isValidPiece(piece)) {
            var pr = this.getPieceProperties(piece);
            color = pr.color;
            type = pr.type;
        }
        return {
            isValidPiece: index_1.Piece.isValidPiece(piece),
            color: color,
            type: type,
        };
    };
    BoardHelper.prototype.convertMask = function (point, index, color) {
        var sign = index_1.Piece.isWhiteColor(color) ? 1 : -1;
        var indexPoint = index_1.Point.fromIndex(index);
        point.x = point.x * sign + indexPoint.x;
        point.y = point.y * sign + indexPoint.y;
        var rect = new Rectangle_1.default(0, 0, constant_1.ROW_LAST_INDEX, constant_1.ROW_LAST_INDEX);
        return rect.isContainsPoint(point);
    };
    BoardHelper.prototype.getPieceCanMovePoses = function (index, type, color) {
        var _this = this;
        var pieceIndices = [];
        mask[type].forEach(function (_pos) {
            var newIndex = _this.convertMask(new index_1.Point(_pos[0], _pos[1]), index, color);
            if (!jsis_1.default.isNull(newIndex)) {
                pieceIndices.push(newIndex);
            }
        });
        return pieceIndices;
    };
    BoardHelper.prototype.getPieceCanMovePosesValid = function (index, type, color, piecesString) {
        var _poses = this.getPieceCanMovePoses(index, type, color);
        var p, distPiece;
        var pieceIndices = [];
        var n = _poses.length;
        var thisPos = index_1.Point.fromIndex(index);
        for (var i = 0; i < n; i++) {
            p = index_1.Point.fromIndex(_poses[i]);
            distPiece = this.getPieceByIndex(p, piecesString);
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
                        if (this.getPieceByIndex(index_1.Point.xyToIndex(_x, _y + _s * _n), piecesString).isValidPiece) {
                            p = null;
                            break;
                        }
                    }
                }
                else if (p.y === thisPos.y) {
                    _n = Math.abs(p.x - thisPos.x);
                    _s = thisPos.x < p.x ? 1 : -1;
                    while (--_n > 0) {
                        if (this.getPieceByIndex(index_1.Point.xyToIndex(_x + _s * _n, _y), piecesString).isValidPiece) {
                            p = null;
                            break;
                        }
                    }
                }
            }
            if (!jsis_1.default.isNull(p)) {
                pieceIndices.push(_poses[i]);
            }
        }
        return pieceIndices;
    };
    BoardHelper.prototype.replacePiecesStringAtIndex = function (piecesString, c, index) {
        return piecesString.substring(0, index) + c + piecesString.substring(index + 1);
    };
    BoardHelper.prototype.injectPiece = function (piecesString, index1, index2) {
        var c = piecesString.charAt(index1);
        if (!this.isCharPiecesInBoard(c, piecesString)) {
            return null;
        }
        piecesString = this.replacePiecesStringAtIndex(piecesString, constant_1.EMPTY_PIECE, index1);
        piecesString = this.replacePiecesStringAtIndex(piecesString, c, index2);
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
            p = this.getPieceByIndex(i, piecesString);
            if (p.isValidPiece && p.color !== color && p.type === constant_1.PIECE_TYPE_TOUK) {
                _poses = this.getPieceCanMovePoses(i, p.type, p.color);
                for (j = 0; j < _poses.length; j++) {
                    if (_poses[j] === kingPos) {
                        return [index_1.Point.fromIndex(i), index_1.Point.fromIndex(kingPos)];
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
            p = this.getPieceByIndex(i, piecesString);
            if (p.isValidPiece && p.color !== color) {
                _poses = this.getPieceCanMovePosesValid(i, p.type, p.color, piecesString);
                for (j = 0; j < _poses.length; j++) {
                    if (_poses[j] === kingPos) {
                        return [index_1.Point.fromIndex(i), index_1.Point.fromIndex(kingPos)];
                    }
                }
            }
        }
        return null;
    };
    BoardHelper.prototype.generatePosesCanMove = function (type, index, color, piecesString, isHaveMoved) {
        var p;
        var _poses = this.getPieceCanMovePosesValid(index, type, color, piecesString);
        var isHaveCaptured = this.isHaveCaptured(piecesString);
        if (type === constant_1.PIECE_TYPE_SDECH) {
            if (!isHaveCaptured && !isHaveMoved) {
                p = this.convertMask(new index_1.Point(2, 1), index, color);
                if (p && !this.getPieceByIndex(p, piecesString).isValidPiece) {
                    _poses.push(p);
                }
                p = this.convertMask(new index_1.Point(-2, 1), index, color);
                if (p && !this.getPieceByIndex(p, piecesString).isValidPiece) {
                    _poses.push(p);
                }
            }
        }
        else if (type === constant_1.PIECE_TYPE_NEANG) {
            if (!isHaveCaptured && !isHaveMoved) {
                p = this.convertMask(new index_1.Point(-0, 2), index, color);
                if (p && !this.getPieceByIndex(p, piecesString).isValidPiece) {
                    _poses.push(p);
                }
            }
        }
        var n = _poses.length;
        var pieceIndices = [];
        var str;
        for (var i = 0; i < n; i++) {
            str = this.injectPiece(piecesString, index, _poses[i]);
            if (jsis_1.default.isNull(this.getKingInDanger(color, str))) {
                pieceIndices.push(index_1.Point.fromIndex(_poses[i]));
            }
        }
        return pieceIndices;
    };
    BoardHelper.prototype.isCharPiecesInBoard = function (code, piecesString) {
        return !!~piecesString.indexOf(code);
    };
    BoardHelper.prototype.getPiecesInBoard = function (piecesString) {
        return piecesString.split('').filter(function (c) {
            return index_1.Piece.isValidPiece(c);
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
            if (index_1.Piece.isValidPiece(c)) {
                prop = this.getPieceProperties(c);
                piece = {
                    color: prop.color,
                    type: prop.type,
                    index: i,
                    code: index_1.Point.fromIndex(i),
                };
                if (index_1.Piece.isWhiteColor(piece.color)) {
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
        var piecesStringArr = piecesString.split('');
        var pieceAll = (_a = {},
            _a[constant_1.PIECE_COLOR_BLACK] = [],
            _a[constant_1.PIECE_COLOR_WHITE] = [],
            _a);
        piecesStringArr.forEach(function (c) {
            if (c === constant_1.EMPTY_PIECE) {
                return;
            }
            var prop = _this.getPieceProperties(c);
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
        var stronger = pieceAll[index_1.Piece.oppositeColor(color)];
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
        var stronger = pieceAll[index_1.Piece.oppositeColor(color)];
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
    return BoardHelper;
}());
;
exports.default = new BoardHelper();
