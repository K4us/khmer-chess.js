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

const boardHelper = require("./src/board-helper");
const MoveHelper = require("./src/move-helper");
const renHelper = require("./src/ren-helper");

const WHITE = boardHelper.PIECE_COLOR_WHITE;
const BLACK = boardHelper.PIECE_COLOR_BLACK;
const TREY_BORK = boardHelper.PIECE_TYPE_BORK; // Transform Fish
const TREY = boardHelper.PIECE_TYPE_TREY; // Fish
const SES = boardHelper.PIECE_TYPE_SES; // Horse
const KOL = boardHelper.PIECE_TYPE_KOL; // General
const TOUK = boardHelper.PIECE_TYPE_TOUK; // Boat
const NEANG = boardHelper.PIECE_TYPE_NEANG; // Queen
const SDECH = boardHelper.PIECE_TYPE_SDECH; // King
const SQUARES = {
  a8: 0, b8: 1, c8: 2, d8: 3, e8: 4, f8: 5, g8: 6, h8: 7,
  a7: 16, b7: 17, c7: 18, d7: 19, e7: 20, f7: 21, g7: 22, h7: 23,
  a6: 32, b6: 33, c6: 34, d6: 35, e6: 36, f6: 37, g6: 38, h6: 39,
  a5: 48, b5: 49, c5: 50, d5: 51, e5: 52, f5: 53, g5: 54, h5: 55,
  a4: 64, b4: 65, c4: 66, d4: 67, e4: 68, f4: 69, g4: 70, h4: 71,
  a3: 80, b3: 81, c3: 82, d3: 83, e3: 84, f3: 85, g3: 86, h3: 87,
  a2: 96, b2: 97, c2: 98, d2: 99, e2: 100, f2: 101, g2: 102, h2: 103,
  a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
};
const FLAGS = {
  NORMAL: 'n',
  CAPTURE: 'c', // ស៊ី
  FLIP: 'f', // បក
  ATTACK: 'a', // អុក
  STUCK: 's', // អាប់
};

class KhmerChess {
  moveHelper = new MoveHelper();
  ren = renHelper.toRen();
  constructor(renStr) {
    this.ren = renHelper.toRen(renStr);
  }
  load() { return false; }
  reset() { return false; }
  moves() { return false; }
  in_check() { return false; }
  in_checkmate() { return false; }
  in_stalemate() { return false; }
  in_draw() { return false; }
  insufficient_material() { return false; }
  in_threefold_repetition() { return false; }
  game_over() { return false; }
  validate_ren() { return false; }
  ren() {
    return this.ren.toString();
  }
  board() { return false; }
  pgn() { return false; }
  load_pgn() { return false; }
  header() { return false; }
  ascii() {
    const arr = this.ren.board.toMultiArray();
    let str = `  ┏━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┓`;
    const result = arr.reduce((s, subArr, i) => {
      const rs = subArr.map((p) => ` ${p ? p.toString() : ' '} `).join('┃');
      const bottom = i == arr.length - 1 ? '┗━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┛' : '┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫';
      s += `
${8 - i} ┃${rs}┃
  ${bottom}`;
      return s;
    }, str);
    return `${result}
   a   b   c   d   e   f   g   h`
  }
  turn() { return false; }
  move() { return false; }
  undo() { return false; }
  clear() { return false; }
  put() { return false; }
  get() { return false; }
  remove() { return false; }
  perft() { return false; }
  square_color() { return false; }
  history() { return false; }
  get_comment() { return false; }
  set_comment() { return false; }
  delete_comment() { return false; }
  get_comments() { return false; }
  delete_comments() { return false; }
}

module.exports = {
  KhmerChess,
};