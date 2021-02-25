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
var constant_1 = require("../brain/constant");
var jsis_1 = __importDefault(require("../brain/jsis"));
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
    Object.defineProperty(Piece.prototype, "title", {
        get: function () {
            return constant_1.COLOR_NAMES[this.color] + " " + constant_1.PIECE_NAMES[this.type];
        },
        enumerable: false,
        configurable: true
    });
    Piece.fromCharCode = function (charCode) {
        if (!Piece.isValidPiece(charCode)) {
            return null;
        }
        var color = Piece.isWhiteCharCode(charCode) ? constant_1.PIECE_COLOR_WHITE : constant_1.PIECE_COLOR_BLACK;
        var type = Piece.toNormalCharCode(charCode);
        return new Piece(type, color);
    };
    Piece.prototype.toOriginPiece = function () {
        if (this.type === constant_1.PIECE_TYPE_BORK) {
            return new Piece(constant_1.PIECE_TYPE_TREY, this.color);
        }
        return this;
    };
    Object.defineProperty(Piece, "pieceChars", {
        get: function () {
            return [
                constant_1.PIECE_TYPE_TOUK,
                constant_1.PIECE_TYPE_SES,
                constant_1.PIECE_TYPE_KOL,
                constant_1.PIECE_TYPE_SDECH,
                constant_1.PIECE_TYPE_NEANG,
                constant_1.PIECE_TYPE_TREY,
                constant_1.PIECE_TYPE_BORK,
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Piece, "colorChars", {
        get: function () {
            return [
                constant_1.PIECE_COLOR_WHITE,
                constant_1.PIECE_COLOR_BLACK,
            ];
        },
        enumerable: false,
        configurable: true
    });
    Piece.toWhiteCharCode = function (charCode) {
        return charCode.toUpperCase();
    };
    Piece.isWhiteCharCode = function (charCode) {
        return jsis_1.default.isUpperCase(charCode);
    };
    Piece.toBlackCharCode = function (charCode) {
        return charCode.toLowerCase();
    };
    Piece.toNormalCharCode = function (charCode) {
        return Piece.toBlackCharCode(charCode);
    };
    Piece.isValidPiece = function (charCode) {
        return charCode !== constant_1.EMPTY_PIECE;
    };
    Piece.isWhiteColor = function (c) {
        return c === constant_1.PIECE_COLOR_WHITE;
    };
    Piece.isBlackColor = function (c) {
        return c === constant_1.PIECE_COLOR_BLACK;
    };
    Piece.oppositeColor = function (color) {
        return Piece.isWhiteColor(color) ? constant_1.PIECE_COLOR_BLACK : constant_1.PIECE_COLOR_WHITE;
    };
    Piece.isValidPiecesString = function (str, onlyPiece) {
        var ruler = onlyPiece ? allPiecesString.filter(function (c) {
            return !~[constant_1.EMPTY_PIECE, constant_1.BOARD_SEPARATOR].indexOf(c);
        }) : allPiecesString;
        return !str.split('').some(function (c) {
            return !~ruler.indexOf(c);
        });
    };
    return Piece;
}());
exports.default = Piece;
var allPiecesString = __spreadArrays(Piece.pieceChars, Piece.pieceChars.map(function (c) {
    return Piece.toWhiteCharCode(c);
}), [
    constant_1.EMPTY_PIECE,
    constant_1.BOARD_SEPARATOR,
]);
