/*
 * Copyright (c) 2021, K4us
 * Author: Raksa Eng (eng.raksa@gmail.com)
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

class KhmerChess {
  constructor() {

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
  validate_fen() { return false; }
  fen() { return false; }
  board() { return false; }
  pgn() { return false; }
  load_pgn() { return false; }
  header() { return false; }
  ascii() { return false; }
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