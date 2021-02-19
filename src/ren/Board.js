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

const Piece = require('./Piece');
const Pos = require('./Pos');
const boardHelper = require('../board-helper');
const jsis = require('../jsis');
const { DEFAULT_BOARD_STR } = require('./constant');

/**
 * BHGQKGHB/8/FFFFFFFF/8/8/ffffffff/8/bhgkqghb => bhgqkghb/......../ffffffff/......../......../FFFFFFFF/......../BHGKQGHB
 */
class Board {
    poses = Array.from({
        length: boardHelper.getSubBoardNumber()
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
        this.poses = newBoardStr.split('').map((type, i) => {
            const codeP = boardHelper.numToCodeP(i);
            return new Pos(type === boardHelper.EMPTY_PIECE ? null : new Piece(type), codeP);
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
            if (i && i % 8 === 0 && i !== boardHelper.getSubBoardNumber()) {
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

module.exports = Board;
