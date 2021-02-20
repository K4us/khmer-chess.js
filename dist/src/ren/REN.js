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
var Board_1 = __importDefault(require("./Board"));
var KqMoved_1 = __importDefault(require("./KqMoved"));
var KAttacked_1 = __importDefault(require("./KAttacked"));
var CountDown_1 = __importDefault(require("./CountDown"));
var Graveyard_1 = __importDefault(require("./Graveyard"));
var index_1 = require("../board/index");
var constant_1 = require("./constant");
var board_1 = require("../board");
/**
 * Raksa-Eng Notation
 * fen: <pieces on board> <turn w|b> <king&queen moved ----|SNsn> <king attack --|Kk> <countdown -.-|-.4> <pieces in graveyard>
 */
var REN = /** @class */ (function () {
    function REN(boardStr, turnStr, kqMovedStr, kAttackedStr, countdownStr, graveyardStr) {
        if (turnStr === void 0) { turnStr = board_1.PIECE_COLOR_WHITE; }
        this.board = new Board_1.default(boardStr);
        this.turn = turnStr;
        this.kqMoved = new KqMoved_1.default(kqMovedStr);
        this.kAttacked = new KAttacked_1.default(kAttackedStr);
        this.countdown = new CountDown_1.default(countdownStr);
        this.graveyard = new Graveyard_1.default(graveyardStr);
        var invalidPiecesString = this.isInvalidPieceCount();
        if (invalidPiecesString) {
            throw new Error("Invalid piece string board:" + boardStr + ", graveyard:" + graveyardStr + ", count:" + invalidPiecesString);
        }
    }
    REN.prototype.isInvalidPieceCount = function () {
        var pieces = this.board.poses.map(function (pos) {
            return pos.piece;
        }).filter(function (p) {
            return !index_1.jsis.isNull(p);
        }).concat(this.graveyard.pieces).map(function (p) {
            return p.toOrigin();
        });
        var piecesCount = pieces.reduce(function (obj, p) {
            obj[p.toString()] = obj[p.toString()] || 0;
            obj[p.toString()]++;
            return obj;
        }, {});
        var str = Object.keys(piecesCount).map(function (k) { return "" + k + piecesCount[k]; }).sort().join('');
        if (str === constant_1.STRING_COUNT) {
            return false;
        }
        return str;
    };
    REN.prototype.toString = function () {
        var str = this.board.toString();
        str += " " + this.turn.toString();
        str += " " + this.kqMoved.toString();
        str += " " + this.kAttacked.toString();
        str += " " + this.countdown.toString();
        str += " " + this.graveyard.toString();
        return str;
    };
    return REN;
}());
exports.default = REN;
