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
exports.pieceHash = exports.oppositeColor = exports.getPieceKeyByName = exports.getPieceKeyByProp = exports.getHashKey = exports.checkCount = exports.checkCountable = exports.isStateCount = exports.extractPiecesToArray = exports.filterPieceInBoard = exports.isHaveCaptured = exports.getPiecesInBoard = exports.isCharPiecesInBoard = exports.generatePosesCanMove = exports.numToCode = exports.numToHVPont = exports.getKingInDanger = exports.getKingWillInDanger = exports.getPieceCode = exports.injectPiece = exports.replacePiecesString = exports.getPieceCanMovePosesValid = exports.getPieceCanMovePoses = exports.convertMask = exports.getPieceByIndex = exports.getPieceByPoint = exports.getCharPieceByIndex = exports.getPieceProperties = exports.getCharPieceFromString = exports.isPosInBoard = exports.indexToIndexCode = exports.pointToIndexCode = exports.indexCodeToIndex = exports.pointToIndex = exports.indexToPoint = exports.getSubBoardNumber = exports.rect = exports.res = exports.p = exports.hvPoint = exports.isBlack = exports.isWhite = exports.isValidPiece = exports.Point = exports.toBlackPiece = exports.toWhitePiece = exports.isValidPiecesString = exports.getColorArray = exports.getPieceCharArray = exports.ROW_LAST_INDEX = exports.ROW_FIRST_INDEX = exports.ROW_NUMBER = exports.VERTICAL_NOTE_LETTERS_ASCII = exports.HORIZONTAL_NOTE_LETTERS_ASCII = exports.VERTICAL_NOTE_LETTERS = exports.HORIZONTAL_NOTE_LETTERS = exports.HORIZONTAL_CODE_LETTERS = exports.BOARD_SEPARATOR = exports.PIECE_COLOR_EMPTY = exports.EMPTY_PIECE = exports.PIECE_TYPE_BORK = exports.PIECE_TYPE_TREY = exports.PIECE_TYPE_NEANG = exports.PIECE_TYPE_SDECH = exports.PIECE_TYPE_KOL = exports.PIECE_TYPE_SES = exports.PIECE_TYPE_TOUK = exports.PIECE_COLOR_BLACK = exports.PIECE_COLOR_WHITE = void 0;
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
var jsis_1 = __importDefault(require("./jsis"));
var genMask_1 = __importDefault(require("./genMask"));
var Rectangle_1 = __importDefault(require("./Rectangle"));
exports.PIECE_COLOR_WHITE = 'w';
exports.PIECE_COLOR_BLACK = 'b';
exports.PIECE_TYPE_TOUK = 'b'; // Boat
exports.PIECE_TYPE_SES = 'h'; // Horse
exports.PIECE_TYPE_KOL = 'g'; // General
exports.PIECE_TYPE_SDECH = 'k'; // King
exports.PIECE_TYPE_NEANG = 'q'; // Queen
exports.PIECE_TYPE_TREY = 'f'; // Fish
exports.PIECE_TYPE_BORK = 't'; // Transform fish
exports.EMPTY_PIECE = '.';
exports.PIECE_COLOR_EMPTY = '';
exports.BOARD_SEPARATOR = '/';
exports.HORIZONTAL_CODE_LETTERS = 'abcdefgh';
exports.HORIZONTAL_NOTE_LETTERS = ['ក', 'ខ', 'គ', 'ឃ', 'ង', 'ច', 'ឆ', 'ជ'];
exports.VERTICAL_NOTE_LETTERS = ['១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩', '១០',
    '១១', '១២', '១៣', '១៤', '១៥', '១៦', '១៧', '១៨', '១៩', '២០',
    '២១', '២២', '២៣', '២៤', '២៥', '២៦', '២៧', '២៨', '២៩', '៣០'];
exports.HORIZONTAL_NOTE_LETTERS_ASCII = 'abcdefgh';
exports.VERTICAL_NOTE_LETTERS_ASCII = Array.from({
    length: 30,
}, function (_, i) { return "" + (i + 1); });
exports.ROW_NUMBER = 8;
exports.ROW_FIRST_INDEX = 0;
exports.ROW_LAST_INDEX = 7;
var mask = null;
function getPieceCharArray() {
    return [
        exports.PIECE_TYPE_TOUK,
        exports.PIECE_TYPE_SES,
        exports.PIECE_TYPE_KOL,
        exports.PIECE_TYPE_SDECH,
        exports.PIECE_TYPE_NEANG,
        exports.PIECE_TYPE_TREY,
        exports.PIECE_TYPE_BORK,
    ];
}
exports.getPieceCharArray = getPieceCharArray;
function getColorArray() {
    return [
        exports.PIECE_COLOR_WHITE,
        exports.PIECE_COLOR_BLACK,
    ];
}
exports.getColorArray = getColorArray;
var allPiecesString = null;
function isValidPiecesString(str, onlyPiece) {
    if (allPiecesString == null) {
        allPiecesString = __spreadArrays(getPieceCharArray(), getPieceCharArray().map(function (c) { return exports.toWhitePiece(c); }), [
            exports.EMPTY_PIECE,
            exports.BOARD_SEPARATOR,
        ]);
    }
    var ruler = onlyPiece ? allPiecesString.filter(function (c) {
        return !~[exports.EMPTY_PIECE, exports.BOARD_SEPARATOR].indexOf(c);
    }) : allPiecesString;
    return !str.split('').some(function (c) {
        return !~ruler.indexOf(c);
    });
}
exports.isValidPiecesString = isValidPiecesString;
exports.toWhitePiece = function (str) { return str.toUpperCase(); };
exports.toBlackPiece = function (str) { return str.toLowerCase(); };
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
exports.Point = Point;
var HvPont = /** @class */ (function () {
    function HvPont(h, v) {
        this.h = h;
        this.v = v;
    }
    return HvPont;
}());
exports.isValidPiece = function (piece) { return piece !== exports.EMPTY_PIECE; };
exports.isWhite = function (c) { return c === exports.PIECE_COLOR_WHITE; };
exports.isBlack = function (c) { return c === exports.PIECE_COLOR_BLACK; };
exports.hvPoint = function (h, v) { return new HvPont(h, v); };
exports.p = function (x, y) { return new Point(x, y); };
exports.res = function (width, height) { return ({ width: width, height: height }); };
exports.rect = function (x, y, width, height) {
    return new Rectangle_1.default(x, y, width, height);
};
exports.getSubBoardNumber = function () { return exports.ROW_NUMBER * exports.ROW_NUMBER; };
exports.indexToPoint = function (index) {
    var x = index % exports.ROW_NUMBER;
    var y = Math.floor(index / exports.ROW_NUMBER);
    return new Point(x, y);
};
exports.pointToIndex = function (point) { return point.x + point.y * exports.ROW_NUMBER; };
exports.indexCodeToIndex = function (code) {
    var x = exports.HORIZONTAL_CODE_LETTERS.indexOf(code[0]);
    var y = Number(code[1]) - 1;
    return exports.pointToIndex(new Point(x, y));
};
exports.pointToIndexCode = function (p) {
    return "" + exports.HORIZONTAL_CODE_LETTERS[p.x] + (p.y + 1);
};
exports.indexToIndexCode = function (index) {
    var x = index % exports.ROW_NUMBER;
    var y = Math.floor(index / exports.ROW_NUMBER);
    return exports.pointToIndexCode(new Point(x, y));
};
exports.isPosInBoard = function (posInBoard) {
    return posInBoard >= 0 && posInBoard <= exports.getSubBoardNumber() - 1;
};
exports.getCharPieceFromString = function (piecesString, posInBoard) {
    if (exports.isPosInBoard(posInBoard) && piecesString.length === exports.getSubBoardNumber()) {
        return piecesString.charAt(posInBoard);
    }
    return exports.EMPTY_PIECE;
};
exports.getPieceProperties = function (code) {
    var h = exports.pieceHash[code];
    return {
        color: h ? h[0] : exports.PIECE_COLOR_EMPTY,
        type: h ? h[1] : exports.EMPTY_PIECE,
    };
};
exports.getCharPieceByIndex = function (index, piecesString) {
    return exports.getCharPieceFromString(piecesString, index);
};
exports.getPieceByPoint = function (point, piecesString) {
    var piece = exports.getCharPieceByIndex(exports.pointToIndex(point), piecesString);
    var color = exports.PIECE_COLOR_WHITE;
    var type = exports.PIECE_TYPE_TREY;
    if (exports.isValidPiece(piece)) {
        var pr = exports.getPieceProperties(piece);
        color = pr.color;
        type = pr.type;
    }
    return {
        isValidPiece: exports.isValidPiece(piece),
        color: color,
        type: type,
    };
};
exports.getPieceByIndex = function (index, piecesString) {
    var piece = exports.getCharPieceByIndex(index, piecesString);
    var color = exports.PIECE_COLOR_WHITE;
    var type = exports.PIECE_TYPE_TREY;
    if (exports.isValidPiece(piece)) {
        var pr = exports.getPieceProperties(piece);
        color = pr.color;
        type = pr.type;
    }
    return {
        isValidPiece: exports.isValidPiece(piece),
        color: color,
        type: type,
    };
};
exports.convertMask = function (point1, point2, color) {
    var sign = exports.isWhite(color) ? 1 : -1;
    point1.x = point1.x * sign + point2.x;
    point1.y = point1.y * sign + point2.y;
    return exports.pointToIndex(point1);
};
exports.getPieceCanMovePoses = function (type, index, color) {
    var indices = [];
    mask = mask || genMask_1.default();
    mask[type].forEach(function (_pos) {
        var point = exports.indexToPoint(index);
        var p = exports.convertMask(new Point(_pos[0], _pos[1]), point, color);
        indices.push(p);
    });
    return indices;
};
exports.getPieceCanMovePosesValid = function (type, point, color, piecesString) {
    var index = exports.pointToIndex(point);
    var _poses = exports.getPieceCanMovePoses(type, index, color);
    var p, distPiece;
    var poses = [];
    var n = _poses.length;
    var thisPos = exports.indexToPoint(index);
    for (var i = 0; i < n; i++) {
        p = exports.indexToPoint(_poses[i]);
        distPiece = exports.getPieceByPoint(p, piecesString);
        if (distPiece.isValidPiece) {
            if (color === distPiece.color ||
                (type === exports.PIECE_TYPE_TREY && p.x === thisPos.x)) {
                p = null;
            }
        }
        else {
            if (type === exports.PIECE_TYPE_TREY && p.x !== thisPos.x) {
                p = null;
            }
        }
        if (!jsis_1.default.isNull(p) && type === exports.PIECE_TYPE_TOUK) {
            var _x = thisPos.x;
            var _y = thisPos.y;
            var _n = void 0, _s = void 0;
            if (p.x === thisPos.x) {
                _n = Math.abs(p.y - thisPos.y);
                _s = thisPos.y < p.y ? 1 : -1;
                while (--_n > 0) {
                    if (exports.getPieceByPoint(new Point(_x, _y + _s * _n), piecesString).isValidPiece) {
                        p = null;
                        break;
                    }
                }
            }
            else if (p.y === thisPos.y) {
                _n = Math.abs(p.x - thisPos.x);
                _s = thisPos.x < p.x ? 1 : -1;
                while (--_n > 0) {
                    if (exports.getPieceByPoint(new Point(_x + _s * _n, _y), piecesString).isValidPiece) {
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
exports.replacePiecesString = function (piecesString, c, p) {
    return piecesString.substring(0, p) + c + piecesString.substring(p + 1);
};
exports.injectPiece = function (piecesString, index1, index2) {
    var c = piecesString.charAt(index1);
    if (!exports.isCharPiecesInBoard(c, piecesString)) {
        return null;
    }
    piecesString = exports.replacePiecesString(piecesString, exports.EMPTY_PIECE, index1);
    piecesString = exports.replacePiecesString(piecesString, c, index2);
    return piecesString;
};
exports.getPieceCode = function (color, type) {
    var val = color + type;
    for (var k in exports.pieceHash) {
        if (val === exports.pieceHash[k]) {
            return k;
        }
    }
    return exports.EMPTY_PIECE;
};
exports.getKingWillInDanger = function (color, piecesString) {
    var kingPos = piecesString.indexOf(exports.getPieceCode(color, exports.PIECE_TYPE_SDECH));
    var n = piecesString.length;
    var _poses, p, j;
    for (var i = 0; i < n; i++) {
        p = exports.getPieceByIndex(i, piecesString);
        if (p.isValidPiece && p.color !== color && p.type === exports.PIECE_TYPE_TOUK) {
            _poses = exports.getPieceCanMovePoses(p.type, i, p.color);
            for (j = 0; j < _poses.length; j++) {
                if (_poses[j] === kingPos) {
                    return [exports.numToCode(i), exports.numToCode(kingPos)];
                }
            }
        }
    }
    return null;
};
exports.getKingInDanger = function (color, piecesString) {
    var kingPos = piecesString.indexOf(exports.getPieceCode(color, exports.PIECE_TYPE_SDECH));
    var n = piecesString.length;
    var _poses, p, j;
    for (var i = 0; i < n; i++) {
        p = exports.getPieceByPoint(exports.indexToPoint(i), piecesString);
        if (p.isValidPiece && p.color !== color) {
            _poses = exports.getPieceCanMovePosesValid(p.type, exports.indexToPoint(i), p.color, piecesString);
            for (j = 0; j < _poses.length; j++) {
                if (_poses[j] === kingPos) {
                    return [exports.numToCode(i), exports.numToCode(kingPos)];
                }
            }
        }
    }
    return null;
};
exports.numToHVPont = function (number) {
    return new HvPont(exports.HORIZONTAL_CODE_LETTERS[number % 8], ((number / 8 | 0) + 1));
};
exports.numToCode = function (number) {
    var hvPoint = exports.numToHVPont(number);
    return "" + hvPoint.h + hvPoint.v;
};
exports.generatePosesCanMove = function (type, point, color, piecesString, isHaveMoved) {
    var index;
    var _poses = exports.getPieceCanMovePosesValid(type, point, color, piecesString);
    var captured = exports.isHaveCaptured(piecesString);
    if (type === exports.PIECE_TYPE_SDECH) {
        if (!captured && !isHaveMoved) {
            index = exports.convertMask(new Point(2, 1), point, color);
            if (index && !exports.getPieceByPoint(exports.indexToPoint(index), piecesString).isValidPiece) {
                _poses.push(index);
            }
            index = exports.convertMask(new Point(-2, 1), point, color);
            if (index && !exports.getPieceByIndex(index, piecesString).isValidPiece) {
                _poses.push(index);
            }
        }
    }
    else if (type === exports.PIECE_TYPE_NEANG) {
        if (!captured && !isHaveMoved) {
            index = exports.convertMask(new Point(-0, 2), point, color);
            if (index && !exports.getPieceByIndex(index, piecesString).isValidPiece) {
                _poses.push(index);
            }
        }
    }
    var n = _poses.length;
    var poses = [];
    var str;
    for (var i = 0; i < n; i++) {
        str = exports.injectPiece(piecesString, exports.pointToIndex(point), _poses[i]);
        if (jsis_1.default.isNull(exports.getKingInDanger(color, str))) {
            poses.push(exports.numToCode(_poses[i]));
        }
    }
    return poses;
};
exports.isCharPiecesInBoard = function (c, piecesString) {
    return !!~piecesString.indexOf(c);
};
exports.getPiecesInBoard = function (piecesString) {
    return piecesString.split('').filter(function (c) {
        return exports.isValidPiece(c);
    });
};
exports.isHaveCaptured = function (piecesString) {
    return exports.getPiecesInBoard(piecesString).length < exports.ROW_NUMBER * 4;
};
exports.filterPieceInBoard = function (piecesString) {
    var whitePieces = [];
    var blackPieces = [];
    var c, prop, piece;
    for (var i = 0; i < piecesString.length; i++) {
        c = piecesString.charAt(i);
        if (exports.isValidPiece(c)) {
            prop = exports.getPieceProperties(c);
            piece = {
                color: prop.color,
                type: prop.type,
                index: i,
                code: exports.numToCode(i),
            };
            if (exports.isWhite(piece.color)) {
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
exports.extractPiecesToArray = function (piecesString) {
    var _a;
    var arr = piecesString.split('');
    var pieceAll = (_a = {},
        _a[exports.PIECE_COLOR_BLACK] = [],
        _a[exports.PIECE_COLOR_WHITE] = [],
        _a);
    arr.forEach(function (e) {
        if (e === exports.EMPTY_PIECE) {
            return;
        }
        var prop = exports.getPieceProperties(e);
        pieceAll[prop.color].push(prop.type);
    });
    return pieceAll;
};
exports.isStateCount = function (c, piecesString) {
    var allPieces = exports.extractPiecesToArray(piecesString);
    var l = allPieces[c].length;
    return l === 1;
};
exports.checkCountable = function (color, piecesString) {
    var pieceAll = exports.extractPiecesToArray(piecesString);
    var weaker = pieceAll[color];
    var stronger = pieceAll[exports.oppositeColor(color)];
    return weaker.length <= 2 && stronger.length >= 2;
};
exports.checkCount = function (color, piecesString, force) {
    var countChar = function (str, c) { return str.join('').split(c).length - 1; };
    var charExist = function (str, c) {
        return !!~str.indexOf(c);
    };
    var pieceAll = exports.extractPiecesToArray(piecesString);
    var weaker = pieceAll[color];
    var stronger = pieceAll[exports.oppositeColor(color)];
    var l = weaker.length;
    if (l === 1 && stronger.length > 1) {
        if (!charExist(stronger, exports.PIECE_TYPE_TREY)) {
            var count = 64;
            var toukCount = countChar(stronger, exports.PIECE_TYPE_TOUK);
            if (toukCount) {
                count = toukCount > 1 ? 8 : 16;
            }
            else if (countChar(stronger, exports.PIECE_TYPE_KOL) > 1) {
                count = 22;
            }
            else if (countChar(stronger, exports.PIECE_TYPE_SES) > 1) {
                count = 32;
            }
            else if (countChar(stronger, exports.PIECE_TYPE_KOL)) {
                count = 44;
            }
            return [stronger.length + 1, count];
        }
        return [0, 64];
    }
    else if (force && exports.checkCountable(color, piecesString)) {
        return [0, 64];
    }
    return null;
};
exports.getHashKey = function (val) {
    var keys = Object.keys(exports.pieceHash).filter(function (key) {
        return exports.pieceHash[key] === val;
    });
    return keys.length === 1 ? keys[0] : exports.EMPTY_PIECE;
};
exports.getPieceKeyByProp = function (prop) {
    var prop1;
    for (var key in exports.pieceHash) {
        prop1 = exports.getPieceProperties(key);
        if (prop.color === prop1.color && prop.type === prop1.type) {
            return key;
        }
    }
    return exports.EMPTY_PIECE;
};
exports.getPieceKeyByName = function (name) {
    return exports.getPieceKeyByProp({
        color: name[0],
        type: name[1],
    });
};
exports.oppositeColor = function (color) {
    return exports.isWhite(color) ? exports.PIECE_COLOR_BLACK : exports.PIECE_COLOR_WHITE;
};
exports.pieceHash = {
    a: "" + exports.PIECE_COLOR_WHITE + exports.PIECE_TYPE_TOUK,
    b: "" + exports.PIECE_COLOR_WHITE + exports.PIECE_TYPE_SES,
    c: "" + exports.PIECE_COLOR_WHITE + exports.PIECE_TYPE_KOL,
    d: "" + exports.PIECE_COLOR_WHITE + exports.PIECE_TYPE_SDECH,
    e: "" + exports.PIECE_COLOR_WHITE + exports.PIECE_TYPE_NEANG,
    f: "" + exports.PIECE_COLOR_WHITE + exports.PIECE_TYPE_TREY,
    g: "" + exports.PIECE_COLOR_WHITE + exports.PIECE_TYPE_BORK,
    h: "" + exports.PIECE_COLOR_BLACK + exports.PIECE_TYPE_TOUK,
    i: "" + exports.PIECE_COLOR_BLACK + exports.PIECE_TYPE_SES,
    j: "" + exports.PIECE_COLOR_BLACK + exports.PIECE_TYPE_KOL,
    k: "" + exports.PIECE_COLOR_BLACK + exports.PIECE_TYPE_SDECH,
    l: "" + exports.PIECE_COLOR_BLACK + exports.PIECE_TYPE_NEANG,
    m: "" + exports.PIECE_COLOR_BLACK + exports.PIECE_TYPE_TREY,
    n: "" + exports.PIECE_COLOR_BLACK + exports.PIECE_TYPE_BORK,
};
