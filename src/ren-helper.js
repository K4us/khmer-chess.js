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
 *----------------------------------------------------------------------------*/

"use strict";
const { PIECE_TYPE_BORK } = require("./board-helper");
/**
 * Raksa-Eng Notation
 * fen: <pieces on board> <turn w|b> <king&queen moved ----|SNsn> <countdown --|-4> <pieces in graveyard>
 * e.g: bhgqkghb/8/ffffffff/8/8/FFFFFFFF/8/BHGKQGHB
 */

const boardHelper = require("./board-helper");
const jsis = require("./jsis");

// bhgqkghb/8/ffffffff/8/8/FFFFFFFF/8/BHGKQGHB w ---- --
const DEFAULT_BOARD_STR = 'bhgqkghb/8/ffffffff/8/8/FFFFFFFF/8/BHGKQGHB';
const NOT_SET = '-';
const STRING_COUNT = 'B2F8G2H2K1Q1b2f8g2h2k1q1';

class Piece {
    type = boardHelper.PIECE_TYPE_TREY;
    color = boardHelper.PIECE_COLOR_WHITE;
    constructor(t, c) {
        if (jsis.isUndefined(c)) {
            if (jsis.isUndefined(t)) {
                t = boardHelper.toWhitePiece(boardHelper.PIECE_TYPE_TREY);
            }
            if (jsis.isUpperCase(t)) {
                c = boardHelper.PIECE_COLOR_WHITE;
            } else {
                c = boardHelper.PIECE_COLOR_BLACK;
            }
            t = t.toLowerCase();
        }
        this.type = t;
        this.color = c;
    }
    toOrigin() {
        if (this.type == PIECE_TYPE_BORK) {
            return new Piece(this.color, boardHelper.PIECE_TYPE_TREY);
        }
        return this;
    }
    toString() {
        let c = this.type;
        if (boardHelper.isWhite(this.color)) {
            c = boardHelper.toWhitePiece(c);
        }
        return c;
    }
}
class Pos {
    h = 'a';
    v = 1;
    x = 0;
    y = 0;
    p = new Piece();
    constructor(p, h, v) {
        this.p = p
        if (jsis.isUndefined(v)) {
            v = h.v;
            h = h.h;
        }
        this.h = h;
        this.v = v;
        this.x = boardHelper.HORIZONTAL_CODE_LETTERS.indexOf(this.h);
        this.y = this.v - 1;
    }
    toString() {
        return `${this.toPString()}${this.h}${this.v}`;
    }
    toPString() {
        return jsis.isNull(this.p) ? boardHelper.EMPTY_PIECE : this.p.toString();
    }
}
/**
 * bhgqkghb/8/ffffffff/8/8/FFFFFFFF/8/BHGKQGHB => bhgqkghb/......../ffffffff/......../......../FFFFFFFF/......../BHGKQGHB
 */
class Board {
    poses = Array.from({
        length: boardHelper.getSubBoardNumber(),
    }, (_, i) => {
        const codeP = boardHelper.numToCodeP(i);
        return new Pos(null, codeP);
    });
    constructor(boardStr) {
        if (jsis.isUndefined(boardStr)) {
            boardStr = DEFAULT_BOARD_STR;
        }
        const newBoardStr = this.extract(boardStr).replace(/\//g, '');
        if (newBoardStr.length < boardHelper.getSubBoardNumber() ||
            !boardHelper.isValidPiecesString(newBoardStr)) {
            throw new Error(`Invalid board string ${boardStr}`);
        }
        this.poses = newBoardStr.split('').map((c, i) => {
            const codeP = boardHelper.numToCodeP(i);
            return new Pos(c == boardHelper.EMPTY_PIECE ? null : new Piece(c), codeP);
        });
    }
    toMultiArray() {
        const arr = [[], [], [], [], [], [], [], []];
        this.poses.forEach((pos) => {
            arr[pos.y][pos.x] = pos.p;
        });
        return arr;
    }
    compress(str) {
        const reg = new RegExp(`(\\${boardHelper.EMPTY_PIECE}+)`, 'g');
        return str.replace(reg, ($1) => $1.length);
    }
    extract(str) {
        return str.replace(/(\d+)/g, ($1) => {
            // $1 == 3 => '...', bh6 => 'bh......'
            return Array.from({
                length: $1
            }, () => boardHelper.EMPTY_PIECE).join('');
        });
    }
    toStringFull() {
        const str = this.poses.map((pos, i) => {
            const p = pos.toPString();
            if (i && i % 8 == 0 && i != boardHelper.getSubBoardNumber()) {
                return `${boardHelper.BOARD_SEPARATOR}${p}`;
            }
            return p;
        }).join('');
        return str;
    }
    toString() {
        let str = this.toStringFull();
        str = this.compress(str);
        return str;
    }
}
class KqMoved {
    whiteKing = false;
    whiteQueen = false;
    blackKing = false;
    blackQueen = false;
    constructor(kqMovedStr = '') {
        const bh = boardHelper;
        this.whiteKing = !!~kqMovedStr.indexOf(bh.toWhitePiece(bh.PIECE_TYPE_SDECH));
        this.whiteQueen = !!~kqMovedStr.indexOf(bh.toWhitePiece(bh.PIECE_TYPE_NEANG));
        this.blackKing = !!~kqMovedStr.indexOf(bh.PIECE_TYPE_SDECH);
        this.blackQueen = !!~kqMovedStr.indexOf(bh.PIECE_TYPE_NEANG);
    }
    toString() {
        let str = `${this.whiteKing ? boardHelper.toWhitePiece(boardHelper.PIECE_TYPE_SDECH) : NOT_SET}`;
        str += `${this.whiteQueen ? boardHelper.toWhitePiece(boardHelper.PIECE_TYPE_NEANG) : NOT_SET}`;
        str += `${this.blackKing ? boardHelper.PIECE_TYPE_SDECH : NOT_SET}`;
        str += `${this.blackQueen ? boardHelper.PIECE_TYPE_NEANG : NOT_SET}`;
        return str;
    }
}
class CountDown {
    white = null;
    black = null;
    constructor(countdownStr = '') {
        this.white = jsis.isStringNumber(countdownStr[0]) ? Number(countdownStr[0]) : null;
        this.black = jsis.isStringNumber(countdownStr[1]) ? Number(countdownStr[1]) : null;
        if (!jsis.isNull(this.white) && !jsis.isNull(this.white)) {
            throw new Error(`Invalid countdown string ${countdownStr}`);
        }
    }
    toString() {
        let str = `${jsis.isNull(this.white) ? NOT_SET : this.white}`;
        str += `${jsis.isNull(this.black) ? NOT_SET : this.black}`;
        return str;
    }
}
class Graveyard {
    pieces = [];
    constructor(graveyardStr = '') {
        if (graveyardStr.length > 30 ||
            !boardHelper.isValidPiecesString(graveyardStr, true)) {
            throw new Error(`Invalid graveyard string ${graveyardStr}`);
        }
        this.pieces = graveyardStr.split('').map((c, i) => {
            const p = new Piece(c);
            if (p.type == boardHelper.PIECE_TYPE_SDECH) {
                throw new Error(`King cannot die graveyard:${graveyardStr}`);
            }
            return p;
        });
    }
    toString() {
        return this.pieces.map((p) => {
            return p.toString();
        }).join('');
    }
}
class REN {
    board = new Board();
    turn = boardHelper.PIECE_COLOR_WHITE;
    kqMoved = new KqMoved();
    countdown = new CountDown();
    graveyard = new Graveyard();
    constructor(boardStr, turnStr = boardHelper.PIECE_COLOR_WHITE,
        kqMovedStr, countdownStr, graveyardStr) {
        this.board = new Board(boardStr);
        this.turn = turnStr;
        this.kqMoved = new KqMoved(kqMovedStr);
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
        if (str == STRING_COUNT) {
            return false;
        }
        return str;
    }
    toString() {
        let str = this.board.toString();
        str += ` ${this.turn.toString()}`;
        str += ` ${this.kqMoved.toString()}`;
        str += ` ${this.countdown.toString()}`;
        str += ` ${this.graveyard.toString()}`;
        return str;
    }
}
const renHelper = {
    Piece,
    Pos,
    Board,
    KqMoved,
    CountDown,
    Graveyard,
    REN,
    EMPTY_PIECE: boardHelper.EMPTY_PIECE,
    DEFAULT_BOARD_STR,
    toRen(fen) {
        if (jsis.isUndefined(fen)) {
            fen = renHelper.DEFAULT_BOARD_STR;
        }
        const fenArr = fen.split(' ');
        return new REN(fenArr[0], fenArr[1], fenArr[2], fenArr[3], fenArr[4]);
    }
};

module.exports = renHelper;