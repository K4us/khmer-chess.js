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
var Piece_1 = __importDefault(require("./Piece"));
var PieceIndex_1 = __importDefault(require("./PieceIndex"));
var index_1 = require("../board/index");
var constant_1 = require("./constant");
var _1 = require(".");
/**
 * BHGQKGHB/8/FFFFFFFF/8/8/ffffffff/8/bhgkqghb => bhgqkghb/......../ffffffff/......../......../FFFFFFFF/......../BHGKQGHB
 */
var Board = /** @class */ (function () {
    function Board(boardStr) {
        this.pieceIndices = Array.from({
            length: index_1.CELL_COUNT,
        }, function (_, i) {
            var point = _1.Point.fromIndex(i);
            return new PieceIndex_1.default(point.x, point.y, null);
        });
        if (index_1.jsis.isUndefined(boardStr)) {
            boardStr = constant_1.DEFAULT_BOARD_STR;
        }
        var newBoardStr = this.extract(boardStr).replace(/\//g, '');
        if (newBoardStr.length < index_1.CELL_COUNT ||
            !Piece_1.default.isValidPiecesString(newBoardStr)) {
            throw new Error("Invalid board string " + boardStr);
        }
        this.pieceIndices = newBoardStr.split('').map(function (charCode, i) {
            var point = _1.Point.fromIndex(i);
            return new PieceIndex_1.default(point.x, point.y, charCode === index_1.EMPTY_PIECE ? null : Piece_1.default.fromCharCode(charCode));
        });
    }
    Board.prototype.toMultiArray = function () {
        var arr = [[], [], [], [], [], [], [], []];
        this.pieceIndices.forEach(function (pieceIndex) {
            arr[pieceIndex.point.y][pieceIndex.point.x] = pieceIndex.piece;
        });
        return arr;
    };
    Board.prototype.compress = function (str) {
        var reg = new RegExp("(\\" + index_1.EMPTY_PIECE + "+)", 'g');
        return str.replace(reg, function ($1) { return $1.length; });
    };
    Board.prototype.extract = function (str) {
        return str.replace(/(\d+)/g, function ($1) {
            // $1 == 3 => '...', bh6 => 'bh......'
            return Array.from({
                length: $1,
            }, function () { return index_1.EMPTY_PIECE; }).join('');
        });
    };
    Board.prototype.toStringFull = function () {
        var str = this.pieceIndices.map(function (pos, i) {
            var p = pos.toCharCode();
            if (i && i % 8 === 0 && i !== index_1.CELL_COUNT) {
                return "" + index_1.BOARD_SEPARATOR + p;
            }
            return p;
        }).join('');
        return str;
    };
    Board.prototype.toString = function () {
        var str = this.toStringFull();
        str = this.compress(str);
        return str;
    };
    return Board;
}());
exports.default = Board;
