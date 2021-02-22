"use strict";
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
var Point_1 = __importDefault(require("../ren/Point"));
var Piece_1 = __importDefault(require("../ren/Piece"));
var PieceIndex_1 = __importDefault(require("../ren/PieceIndex"));
var mask = genMask_1.default();
var BoardHelper = /** @class */ (function () {
    function BoardHelper() {
        this.convertMask = function (point1, index, color) {
            var sign = Piece_1.default.isWhiteColor(color) ? 1 : -1;
            var point2 = Point_1.default.fromIndex(index);
            point1.x = point1.x * sign + point2.x;
            point1.y = point1.y * sign + point2.y;
            return point1.index;
        };
    }
    BoardHelper.prototype.getCharPieceFromString = function (piecesString, index) {
        if (Point_1.default.isIndexInBoard(index) && piecesString.length === constant_1.CELL_COUNT) {
            return piecesString.charAt(index);
        }
        return constant_1.EMPTY_PIECE;
    };
    BoardHelper.prototype.getPieceProperties = function (pieceCode) {
        var h = constant_1.pieceHash[pieceCode];
        return new Piece_1.default(h ? h[1] : constant_1.EMPTY_PIECE, h ? h[0] : constant_1.PIECE_COLOR_EMPTY);
    };
    BoardHelper.prototype.getCharPieceInPos = function (index, piecesString) {
        return this.getCharPieceFromString(piecesString, index);
    };
    BoardHelper.prototype.getPieceByIndex = function (index, piecesString) {
        var piece = this.getCharPieceInPos(index, piecesString);
        return {
            isValidPiece: Piece_1.default.isValidPiece(piece),
            piece: Piece_1.default.fromCharCode(piece),
        };
    };
    BoardHelper.prototype.getPieceCanMovePoses = function (index, piece) {
        var _this = this;
        var pieceIndices = [];
        mask[piece.type].forEach(function (_pos) {
            var newIndex = _this.convertMask(new Point_1.default(_pos[0], _pos[1]), index, piece.color);
            if (!jsis_1.default.isNull(newIndex)) {
                pieceIndices.push(newIndex);
            }
        });
        return pieceIndices;
    };
    BoardHelper.prototype.getPieceCanMovePosesValid = function (index, piece, piecesString) {
        var _poses = this.getPieceCanMovePoses(index, piece);
        var pieceIndices = [];
        var n = _poses.length;
        var thisPos = Point_1.default.fromIndex(index);
        for (var i = 0; i < n; i++) {
            var p = Point_1.default.fromIndex(_poses[i]);
            var distPiece = this.getPieceByIndex(p.index, piecesString);
            if (distPiece.isValidPiece) {
                if (piece.color === distPiece.piece.color ||
                    (piece.type === constant_1.PIECE_TYPE_TREY && p.x === thisPos.x)) {
                    p = null;
                }
            }
            else {
                if (piece.type === constant_1.PIECE_TYPE_TREY && p.x !== thisPos.x) {
                    p = null;
                }
            }
            if (!jsis_1.default.isNull(p) && piece.type === constant_1.PIECE_TYPE_TOUK) {
                var _x = thisPos.x;
                var _y = thisPos.y;
                if (p.x === thisPos.x) {
                    var _n = Math.abs(p.y - thisPos.y);
                    var _s = thisPos.y < p.y ? 1 : -1;
                    while (--_n > 0) {
                        if (this.getPieceByIndex(Point_1.default.xyToIndex(_x, _y + _s * _n), piecesString).isValidPiece) {
                            p = null;
                            break;
                        }
                    }
                }
                else if (p.y === thisPos.y) {
                    var _n = Math.abs(p.x - thisPos.x);
                    var _s = thisPos.x < p.x ? 1 : -1;
                    while (--_n > 0) {
                        if (this.getPieceByIndex(Point_1.default.xyToIndex(_x + _s * _n, _y), piecesString).isValidPiece) {
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
    BoardHelper.prototype.getPieceCode = function (piece) {
        var val = piece.color + piece.type;
        for (var k in constant_1.pieceHash) {
            if (val === constant_1.pieceHash[k]) {
                return k;
            }
        }
        return constant_1.EMPTY_PIECE;
    };
    BoardHelper.prototype.getKingWillInDanger = function (color, piecesString) {
        var kingPos = piecesString.indexOf(this.getPieceCode(new Piece_1.default(constant_1.PIECE_TYPE_SDECH, color)));
        var n = piecesString.length;
        for (var i = 0; i < n; i++) {
            var p = this.getPieceByIndex(i, piecesString);
            if (p.isValidPiece && p.piece.color !== color &&
                p.piece.type === constant_1.PIECE_TYPE_TOUK) {
                var _poses = this.getPieceCanMovePoses(i, p.piece);
                for (var j = 0; j < _poses.length; j++) {
                    if (_poses[j] === kingPos) {
                        return [Point_1.default.fromIndex(i), Point_1.default.fromIndex(kingPos)];
                    }
                }
            }
        }
        return null;
    };
    BoardHelper.prototype.getKingInDanger = function (color, piecesString) {
        var kingPos = piecesString.indexOf(this.getPieceCode(new Piece_1.default(constant_1.PIECE_TYPE_SDECH, color)));
        var n = piecesString.length;
        for (var i = 0; i < n; i++) {
            var p = this.getPieceByIndex(i, piecesString);
            if (p.isValidPiece && p.piece.color !== color) {
                var _poses = this.getPieceCanMovePosesValid(i, p.piece, piecesString);
                for (var j = 0; j < _poses.length; j++) {
                    if (_poses[j] === kingPos) {
                        return [Point_1.default.fromIndex(i), Point_1.default.fromIndex(kingPos)];
                    }
                }
            }
        }
        return null;
    };
    BoardHelper.prototype.generatePosesCanMove = function (index, piece, piecesString, isHaveMoved) {
        var _poses = this.getPieceCanMovePosesValid(index, piece, piecesString);
        var isHaveCaptured = this.isHaveCaptured(piecesString);
        if (piece.type === constant_1.PIECE_TYPE_SDECH) {
            if (!isHaveCaptured && !isHaveMoved) {
                var p = this.convertMask(new Point_1.default(2, 1), index, piece.color);
                if (p && !this.getPieceByIndex(p, piecesString).isValidPiece) {
                    _poses.push(p);
                }
                p = this.convertMask(new Point_1.default(-2, 1), index, piece.color);
                if (p && !this.getPieceByIndex(p, piecesString).isValidPiece) {
                    _poses.push(p);
                }
            }
        }
        else if (piece.type === constant_1.PIECE_TYPE_NEANG) {
            if (!isHaveCaptured && !isHaveMoved) {
                var p = this.convertMask(new Point_1.default(-0, 2), index, piece.color);
                if (p && !this.getPieceByIndex(p, piecesString).isValidPiece) {
                    _poses.push(p);
                }
            }
        }
        var n = _poses.length;
        var pieceIndices = [];
        for (var i = 0; i < n; i++) {
            var str = this.injectPiece(piecesString, index, _poses[i]);
            if (jsis_1.default.isNull(this.getKingInDanger(piece.color, str))) {
                pieceIndices.push(Point_1.default.fromIndex(_poses[i]));
            }
        }
        return pieceIndices;
    };
    BoardHelper.prototype.isCharPiecesInBoard = function (code, piecesString) {
        return !!~piecesString.indexOf(code);
    };
    BoardHelper.prototype.getPiecesInBoard = function (piecesString) {
        return piecesString.split('').filter(function (c) {
            return Piece_1.default.isValidPiece(c);
        });
    };
    BoardHelper.prototype.isHaveCaptured = function (piecesString) {
        return this.getPiecesInBoard(piecesString).length < constant_1.ROW_NUMBER * 4;
    };
    BoardHelper.prototype.filterPieceInBoard = function (piecesString) {
        var whitePieces = [];
        var blackPieces = [];
        for (var i = 0; i < piecesString.length; i++) {
            var c = piecesString.charAt(i);
            if (Piece_1.default.isValidPiece(c)) {
                var piece = this.getPieceProperties(c);
                var point = Point_1.default.fromIndex(i);
                var pieceIndex = new PieceIndex_1.default(point.x, point.y, piece);
                if (Piece_1.default.isWhiteColor(piece.color)) {
                    whitePieces.push(pieceIndex);
                }
                else {
                    blackPieces.push(pieceIndex);
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
        var stronger = pieceAll[Piece_1.default.oppositeColor(color)];
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
        var stronger = pieceAll[Piece_1.default.oppositeColor(color)];
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
    return BoardHelper;
}());
;
exports.default = new BoardHelper();
