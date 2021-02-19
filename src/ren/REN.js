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

'use strict';

const Board = require('./Board');
const KqMoved = require('./KqMoved');
const KAttacked = require('./KAttacked');
const CountDown = require('./CountDown');
const Graveyard = require('./Graveyard');
const boardHelper = require('../board-helper');
const jsis = require('../jsis');
const { STRING_COUNT } = require('./constant');

/**
 * Raksa-Eng Notation
 * fen: <pieces on board> <turn w|b> <king&queen moved ----|SNsn> <king attack --|Kk> <countdown -.-|-.4> <pieces in graveyard>
 */
class REN {
    board = new Board();
    turn = boardHelper.PIECE_COLOR_WHITE;
    kqMoved = new KqMoved();
    kAttacked = new KAttacked();
    countdown = new CountDown();
    graveyard = new Graveyard();
    constructor(boardStr, turnStr = boardHelper.PIECE_COLOR_WHITE,
        kqMovedStr, kAttackedStr, countdownStr, graveyardStr) {
        this.board = new Board(boardStr);
        this.turn = turnStr;
        this.kqMoved = new KqMoved(kqMovedStr);
        this.kqMoved = new KAttacked(kAttackedStr);
        this.countdown = new CountDown(countdownStr);
        this.graveyard = new Graveyard(graveyardStr);
        const invalidPiecesString = this.isInvalidPieceCount();
        if (invalidPiecesString) {
            throw new Error(`Invalid piece string board:${boardStr}, graveyard:${graveyardStr}, count:${invalidPiecesString}`);
        }
    }

    isInvalidPieceCount() {
        const pieces = this.board.poses.map((pos) => {
            return pos.p;
        }).filter((p) => {
            return !jsis.isNull(p);
        }).concat(this.graveyard.pieces).map((p) => {
            return p.toOrigin();
        });
        const piecesCount = pieces.reduce((obj, p) => {
            obj[p.toString()] = obj[p.toString()] || 0;
            obj[p.toString()]++;
            return obj;
        }, {});
        const str = Object.keys(piecesCount).map((k) => `${k}${piecesCount[k]}`).sort().join('');
        if (str === STRING_COUNT) {
            return false;
        }
        return str;
    }

    toString() {
        let str = this.board.toString();
        str += ` ${this.turn.toString()}`;
        str += ` ${this.kqMoved.toString()}`;
        str += ` ${this.kAttacked.toString()}`;
        str += ` ${this.countdown.toString()}`;
        str += ` ${this.graveyard.toString()}`;
        return str;
    }
}

module.exports = REN;
