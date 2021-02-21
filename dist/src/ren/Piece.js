"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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
var index_1 = require("../board/index");
var Piece = /** @class */ (function () {
    function Piece(type, color) {
        this.type = Piece.toNormalCharCode(type);
        this.color = color;
    }
    Object.defineProperty(Piece.prototype, "pieceCharCode", {
        get: function () {
            if (Piece.isWhiteColor(this.color)) {
                return Piece.toWhiteCharCode(this.type);
            }
            return this.type;
        },
        enumerable: false,
        configurable: true
    });
    Piece.fromCharCode = function (charCode) {
        if (!Piece.isValidPiece(charCode)) {
            return null;
        }
        var color = Piece.isWhiteCharCode(charCode) ? index_1.PIECE_COLOR_WHITE : index_1.PIECE_COLOR_BLACK;
        var type = Piece.toNormalCharCode(charCode);
        return new Piece(type, color);
    };
    Piece.prototype.toOriginPiece = function () {
        if (this.type === index_1.PIECE_TYPE_BORK) {
            return new Piece(index_1.PIECE_TYPE_TREY, this.color);
        }
        return this;
    };
    Piece.getPieceCharArray = function () {
        return [
            index_1.PIECE_TYPE_TOUK,
            index_1.PIECE_TYPE_SES,
            index_1.PIECE_TYPE_KOL,
            index_1.PIECE_TYPE_SDECH,
            index_1.PIECE_TYPE_NEANG,
            index_1.PIECE_TYPE_TREY,
            index_1.PIECE_TYPE_BORK,
        ];
    };
    Piece.getColorArray = function () {
        return [
            index_1.PIECE_COLOR_WHITE,
            index_1.PIECE_COLOR_BLACK,
        ];
    };
    Piece.toWhiteCharCode = function (charCode) {
        return charCode.toUpperCase();
    };
    Piece.isWhiteCharCode = function (charCode) {
        return index_1.jsis.isUpperCase(charCode);
    };
    Piece.toBlackCharCode = function (charCode) {
        return charCode.toLowerCase();
    };
    Piece.toNormalCharCode = function (charCode) {
        return Piece.toBlackCharCode(charCode);
    };
    Piece.isValidPiece = function (piece) {
        return piece !== index_1.EMPTY_PIECE;
    };
    Piece.isWhiteColor = function (c) {
        return c === index_1.PIECE_COLOR_WHITE;
    };
    Piece.isBlackColor = function (c) {
        return c === index_1.PIECE_COLOR_BLACK;
    };
    Piece.oppositeColor = function (color) {
        return Piece.isWhiteColor(color) ? index_1.PIECE_COLOR_BLACK : index_1.PIECE_COLOR_WHITE;
    };
    Piece.isValidPiecesString = function (str, onlyPiece) {
        var ruler = onlyPiece ? allPiecesString.filter(function (c) {
            return !~[index_1.EMPTY_PIECE, index_1.BOARD_SEPARATOR].indexOf(c);
        }) : allPiecesString;
        return !str.split('').some(function (c) {
            return !~ruler.indexOf(c);
        });
    };
    return Piece;
}());
exports.default = Piece;
var allPiecesString = __spreadArrays(Piece.getPieceCharArray(), Piece.getPieceCharArray().map(function (c) {
    return Piece.toWhiteCharCode(c);
}), [
    index_1.EMPTY_PIECE,
    index_1.BOARD_SEPARATOR,
]);
