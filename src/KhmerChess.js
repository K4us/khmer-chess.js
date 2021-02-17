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

/* eslint-disable no-irregular-whitespace */

'use strict';

const { KPGN } = require('./KPGN');
const MoveHelper = require('./move-helper');
const renHelper = require('./ren-helper');
const config = require('../package.json');
const { asciiTable } = require('./table');

class KhmerChess {
  static name = config.name;
  static version = config.version;
  moveHelper = new MoveHelper();
  renInstance = renHelper.toRen();
  kpgnInstance = new KPGN();
  constructor(renStr) {
      this.renInstance = renHelper.toRen(renStr);
  }

  load(renStr) {
      this.renInstance = renHelper.toRen(renStr);
  }

  reset() {
      this.renInstance = renHelper.toRen();
  }

  /**
   * Generate all available moves of current turn
   */
  moves() {
      // TODO:
      return [];
  }

  /**
   * Is King is attacked (អុក), return under attack color
   *
   * return color|null
   */
  inCheck() {
      // TODO:
      return null;
  }

  /**
   * Is win, return lost color
   *
   * return color|null
   */
  inCheckmate() {
      // TODO:
      return null;
  }

  /**
   * Is stuck (អាប់), return stuck color
   *
   * return color|null
   */
  inStalemate() {
      // TODO:
      return null;
  }

  /**
   * Is draw (ស្មើ)
   *
   * return boolean
   */
  inDraw() {
      // TODO:
      return false;
  }

  /**
   * Is draw by counting over (ស្មើ​ដោយ​ការ​រាប់), return counter color
   *
   * return color|null
   */
  inDrawCount() {
      // TODO:
      return null;
  }

  /**
   * Is game over, win|stuck|win-timeout|draw-count-over|win-resign
   */
  gameOver() {
      // TODO:
      return false;
  }

  validateRen(renStr) {
      try {
          renHelper.toRen(renStr);
          return { valid: true, error_number: 0, error: 'No errors.' };
      } catch (error) {
          return { valid: false, error_number: 1, error: error.message };
      }
  }

  ren() {
      return this.renInstance.toString();
  }

  board() {
      return this.renInstance.board.toMultiArray();
  }

  graveyard() {
      return this.renInstance.graveyard.pieces;
  }

  // Khmer Portable Game Notation <file-name>.kpgn.json
  kpgn() {
      return this.kpgnInstance.toJson();
  }

  loadKpgn(kpgnJosn, options) {
      this.kpgnInstance = new KPGN(kpgnJosn);
  }

  ascii() {
      return asciiTable(this.renInstance);
  }

  turn() {
      return this.renInstance.turn;
  }

  /**
   * Move piece regarding provided Move object
   *
   * @param Move move
   */
  move(move) {
      // TODO:
  }

  /**
   * Undo last move
   *
   * return {Piece, Move}|null
   */
  undo() {
      // TODO:
      return false;
  }

  /**
   * Move all pieces to graveyard except kings
   * -> 4k3/8/8/8/8/8/8/3K4 w ---- -- -.- bhgqghbffffffffFFFFFFFFBHGQGHB
   */
  clear() {
      this.renInstance = renHelper.toRen('4k3/8/8/8/8/8/8/3K4 w ---- -- -.- bhgqghbffffffffFFFFFFFFBHGQGHB');
  }

  /**
   * Move piece to square id location
   *
   * @param Piece piece
   * @param String squareId
   *
   * return Piece|null
   */
  put(piece, squareId) {
      // TODO: move piece to square id location
      return null;
  }

  /**
   * Get piece at square id location
   *
   * @param String squareId 'a1'
   *
   * return Piece|null
   */
  get(squareId) {
      // TODO: get piece at square id location
      return null;
  }

  /**
   * Move piece to graveyard
   *
   * @param String squareId 'a1'
   *
   * return Piece|null
   */
  remove(squareId) {
      // TODO: move piece to graveyard
      return null;
  }

  history() {
      return this.kpgnInstance.moves;
  }

  addUpdateRenderEventListener(listener) {
      // TODO:
  }

  removeUpdateRenderEventListener(listener) {
      // TODO:
  }
}

module.exports = {
    KhmerChess
};
