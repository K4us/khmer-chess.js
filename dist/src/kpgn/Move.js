"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Piece_1 = __importDefault(require("../ren/Piece"));
var Move = /** @class */ (function () {
    function Move(moveFromIndex, moveToIndex, capturedPiece, isJumping) {
        this.isJumping = false; // King or Queen would jump on first start
        this.moveFromIndex = moveFromIndex;
        this.moveToIndex = moveToIndex;
        this.capturedPiece = capturedPiece;
        this.isJumping = !!isJumping;
    }
    // Spec: Fc5d6xf => White fish (F) moved from c5 to d6 killed black fish (f)
    Move.fromMovedString = function () {
        // const str = 'Fc5d6j';
        var str = 'Fc5d6xf';
        var piece = Piece_1.default.fromCharCode(str[0]);
        var fromIndexCode = str.substr(1, 2);
        var toIndexCode = str.substr(3, 2);
        if (str[5] === 'x') {
            var capturedPieceChar = str[6];
        }
        else if (str[5] === 'j') {
            var isJumping = true;
        }
        return 'c5d6';
    };
    Move.prototype.toString = function () {
        // TODO: implement this
        // const str = 'Fc5d6j';
        var str = 'Fc5d6xf';
        var pieceChar = str[0];
        var fromIndexCode = str.substr(1, 2);
        var toIndexCode = str.substr(3, 2);
        if (str[5] === 'x') {
            var capturedPieceChar = str[6];
        }
        else if (str[5] === 'j') {
            var isJumping = true;
        }
        return 'c5d6';
    };
    Move.prototype.toJson = function () {
        return {
            fromIndex: this.moveFromIndex,
            toIndex: this.moveToIndex,
            isJumping: this.isJumping,
            capturedPiece: this.capturedPiece ? this.capturedPiece.pieceCharCode : null,
        };
    };
    return Move;
}());
exports.default = Move;
