"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pieceHash = exports.VERTICAL_NOTE_LETTERS_ASCII = exports.HORIZONTAL_NOTE_LETTERS_ASCII = exports.VERTICAL_NOTE_LETTERS = exports.HORIZONTAL_NOTE_LETTERS = exports.HORIZONTAL_CODE_LETTERS = exports.CELL_COUNT = exports.ROW_LAST_INDEX = exports.ROW_FIRST_INDEX = exports.ROW_NUMBER = exports.BOARD_SEPARATOR = exports.PIECE_COLOR_EMPTY = exports.EMPTY_PIECE = exports.PIECE_TYPE_BORK = exports.PIECE_TYPE_TREY = exports.PIECE_TYPE_NEANG = exports.PIECE_TYPE_SDECH = exports.PIECE_TYPE_KOL = exports.PIECE_TYPE_SES = exports.PIECE_TYPE_TOUK = exports.PIECE_COLOR_BLACK = exports.PIECE_COLOR_WHITE = void 0;
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
exports.PIECE_COLOR_EMPTY = '.';
exports.BOARD_SEPARATOR = '/';
exports.ROW_NUMBER = 8;
exports.ROW_FIRST_INDEX = 0;
exports.ROW_LAST_INDEX = 7;
exports.CELL_COUNT = exports.ROW_NUMBER * exports.ROW_NUMBER;
exports.HORIZONTAL_CODE_LETTERS = 'abcdefgh';
exports.HORIZONTAL_NOTE_LETTERS = ['ក', 'ខ', 'គ', 'ឃ', 'ង', 'ច', 'ឆ', 'ជ'];
exports.VERTICAL_NOTE_LETTERS = ['១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩', '១០',
    '១១', '១២', '១៣', '១៤', '១៥', '១៦', '១៧', '១៨', '១៩', '២០',
    '២១', '២២', '២៣', '២៤', '២៥', '២៦', '២៧', '២៨', '២៩', '៣០'];
exports.HORIZONTAL_NOTE_LETTERS_ASCII = 'abcdefgh';
exports.VERTICAL_NOTE_LETTERS_ASCII = Array.from({ length: 30 }, function (_, i) { return "" + (i + 1); });
exports.pieceHash = {
    a: exports.PIECE_COLOR_WHITE + exports.PIECE_TYPE_TOUK,
    b: exports.PIECE_COLOR_WHITE + exports.PIECE_TYPE_SES,
    c: exports.PIECE_COLOR_WHITE + exports.PIECE_TYPE_KOL,
    d: exports.PIECE_COLOR_WHITE + exports.PIECE_TYPE_SDECH,
    e: exports.PIECE_COLOR_WHITE + exports.PIECE_TYPE_NEANG,
    f: exports.PIECE_COLOR_WHITE + exports.PIECE_TYPE_TREY,
    g: exports.PIECE_COLOR_WHITE + exports.PIECE_TYPE_BORK,
    h: exports.PIECE_COLOR_BLACK + exports.PIECE_TYPE_TOUK,
    i: exports.PIECE_COLOR_BLACK + exports.PIECE_TYPE_SES,
    j: exports.PIECE_COLOR_BLACK + exports.PIECE_TYPE_KOL,
    k: exports.PIECE_COLOR_BLACK + exports.PIECE_TYPE_SDECH,
    l: exports.PIECE_COLOR_BLACK + exports.PIECE_TYPE_NEANG,
    m: exports.PIECE_COLOR_BLACK + exports.PIECE_TYPE_TREY,
    n: exports.PIECE_COLOR_BLACK + exports.PIECE_TYPE_BORK,
};
