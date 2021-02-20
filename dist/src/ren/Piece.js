"use strict";
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
        if (index_1.jsis.isUndefined(color)) {
            if (index_1.jsis.isUndefined(type)) {
                type = index_1.boardHelper.toWhitePiece(index_1.PIECE_TYPE_TREY);
            }
            if (index_1.jsis.isUpperCase(type)) {
                color = index_1.PIECE_COLOR_WHITE;
            }
            else {
                color = index_1.PIECE_COLOR_BLACK;
            }
        }
        type = index_1.boardHelper.toBlackPiece(type);
        this.type = type;
        this.color = color;
    }
    Object.defineProperty(Piece.prototype, "pCode", {
        get: function () {
            if (this.color === index_1.PIECE_COLOR_WHITE) {
                return index_1.boardHelper.toWhitePiece(this.type);
            }
            return this.type;
        },
        enumerable: false,
        configurable: true
    });
    Piece.prototype.toOrigin = function () {
        if (this.type === index_1.PIECE_TYPE_BORK) {
            return new Piece(index_1.PIECE_TYPE_TREY, this.color);
        }
        return this;
    };
    Piece.prototype.toString = function () {
        var c = this.type;
        if (index_1.boardHelper.isWhite(this.color)) {
            c = index_1.boardHelper.toWhitePiece(c);
        }
        return c;
    };
    return Piece;
}());
exports.default = Piece;
