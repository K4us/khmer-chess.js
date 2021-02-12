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

const MoveHelper = require("./src/move-helper");
const renHelper = require("./src/ren-helper");

class KhmerChess {
  moveHelper = new MoveHelper();
  renInstance = renHelper.toRen();
  constructor(renStr) {
    this.renInstance = renHelper.toRen(renStr);
  }
  load() {
    // TODO:
    return false;
  }
  reset() {
    // TODO:
    return false;
  }
  moves() {
    // TODO:
    return false;
  }
  in_check() {
    // TODO:
    return false;
  }
  in_checkmate() {
    // TODO:
    return false;
  }
  in_stalemate() {
    // TODO:
    return false;
  }
  in_draw() {
    // TODO:
    return false;
  }
  insufficient_material() {
    // TODO:
    return false;
  }
  in_threefold_repetition() {
    // TODO:
    return false;
  }
  game_over() {
    // TODO:
    return false;
  }
  validate_ren() {
    // TODO:
    return false;
  }
  ren() {
    return this.renInstance.toString();
  }
  board() {
    // TODO:
    return false;
  }
  pgn() {
    // TODO:
    return false;
  }
  load_pgn() {
    // TODO:
    return false;
  }
  header() {
    // TODO:
    return false;
  }
  ascii() {
    const arr = this.renInstance.board.toMultiArray();
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
  turn() {
    // TODO:
    return false;
  }
  move() {
    // TODO:
    return false;
  }
  undo() {
    // TODO:
    return false;
  }
  clear() {
    // TODO:
    return false;
  }
  put() {
    // TODO:
    return false;
  }
  get() {
    // TODO:
    return false;
  }
  remove() {
    // TODO:
    return false;
  }
  perft() {
    // TODO:
    return false;
  }
  square_color() {
    // TODO:
    return false;
  }
  history() {
    // TODO:
    return false;
  }
  get_comment() {
    // TODO:
    return false;
  }
  set_comment() {
    // TODO:
    return false;
  }
  delete_comment() {
    // TODO:
    return false;
  }
  get_comments() {
    // TODO:
    return false;
  }
  delete_comments() {
    // TODO:
    return false;
  }
}

module.exports = {
  KhmerChess,
};